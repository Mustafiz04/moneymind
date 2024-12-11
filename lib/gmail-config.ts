import { google } from 'googleapis'

export const GMAIL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/gmail/callback`,
  scopes: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify'
  ]
}

export const oauth2Client = new google.auth.OAuth2(
  GMAIL_CONFIG.clientId,
  GMAIL_CONFIG.clientSecret,
  GMAIL_CONFIG.redirectUri
) 