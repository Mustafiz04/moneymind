import { GMAIL_CONFIG, oauth2Client } from '@/lib/gmail-config'
import { NextResponse } from 'next/server'

export async function GET() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_CONFIG.scopes,
    prompt: 'consent'
  })

  return NextResponse.json({ url: authUrl })
} 