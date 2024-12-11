import { google } from 'googleapis'
import { parseEmailContent } from '@/lib/transaction-parser'
import { supabase } from './supabase'

export async function processEmails(auth: any, userId: string) {
  const gmail = google.gmail({ version: 'v1', auth })

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:(noreply@hdfcbank.net OR alerts@axisbank.com) newer_than:1d'
    })

    const messages = response.data.messages || []
    
    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!
      })

      const transaction = parseEmailContent(email.data)
      if (transaction) {
        await saveTransaction(transaction, userId)
      }
    }
  } catch (error) {
    console.error('Error processing emails:', error)
  }
}

async function saveTransaction(transaction: any, userId: string) {
  const { error } = await supabase
    .from('transactions')
    .insert({
      ...transaction,
      user_id: userId,
      source: 'email'
    })

  if (error) console.error('Error saving transaction:', error)
} 