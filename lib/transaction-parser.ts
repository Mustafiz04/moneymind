import { GaxiosResponse } from 'googleapis-common'
import { gmail_v1 } from 'googleapis'

interface Transaction {
  type: 'EXPENSE' | 'INCOME'
  amount: number
  date: Date
  category_id?: string
  notes?: string
  tags?: string[]
}

export function parseEmailContent(email: gmail_v1.Schema$Message): Transaction | null {
  const body = email.payload?.body?.data || ''
  const decodedBody = Buffer.from(body, 'base64').toString()

  // Add your parsing logic here for different bank email formats
  // This is a basic example:
  const amountMatch = decodedBody.match(/Rs\.\s*([\d,]+(\.\d{2})?)/i)
  if (!amountMatch) return null

  return {
    type: 'EXPENSE',
    amount: parseFloat(amountMatch[1].replace(/,/g, '')),
    date: new Date(),
    notes: email.snippet || undefined,
    tags: ['auto-detected']
  }
} 