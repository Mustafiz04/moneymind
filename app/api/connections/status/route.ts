import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('email_connections')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json({
      isConnected: !!data,
      lastSync: data?.last_sync,
    })
  } catch (error) {
    console.error('Error checking connection status:', error)
    return NextResponse.json({
      isConnected: false,
      error: 'Failed to check connection status'
    })
  }
} 