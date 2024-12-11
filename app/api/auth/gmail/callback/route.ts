import { oauth2Client } from '@/lib/gmail-config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const code = searchParams.get('code')
  const supabase = createRouteHandlerClient({ cookies })

  if (!code) {
    return NextResponse.redirect('/dashboard/connect?error=No code provided')
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Save tokens to database
    const { error } = await supabase
      .from('email_connections')
      .insert({
        user_id: 'current_user_id', // You'll need to get this from auth
        provider: 'gmail',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + (tokens.expiry_date || 0)).toISOString()
      })

    if (error) throw error

    return NextResponse.redirect('/dashboard/connect?status=success')
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect('/dashboard/connect?error=Authentication failed')
  }
} 