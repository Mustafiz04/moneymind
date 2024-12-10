import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { DEFAULT_CATEGORIES } from '@/lib/constants'

async function createDefaultCategories(userId: string) {
  try {
    console.log('Creating default categories for user:', userId)
    
    // First check if user already has categories
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .limit(1)

    if (existingCategories?.length) {
      console.log('User already has categories, skipping creation')
      return
    }

    const { data, error } = await supabase
      .from('categories')
      .insert(
        DEFAULT_CATEGORIES.map(category => ({
          name: category.name,
          type: category.type,
          user_id: userId
        }))
      )
      .select()

    if (error) {
      console.error('Error creating categories:', error)
      throw error
    }

    console.log('Successfully created categories:', data?.length)
  } catch (error) {
    console.error('Failed to create default categories:', error)
    throw error // Re-throw to handle in the webhook
  }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type;
  
  if (eventType === 'user.created') {
    try {
      console.log('Processing user.created event for user:', evt.data.id)
      
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      const email = email_addresses[0]?.email_address;

      // Create user in Supabase
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id,
          clerk_id: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(' '),
          image_url,
          currency_symbol: '₹'
        })

      if (userError) {
        console.error('Error creating user in Supabase:', userError)
        return new NextResponse(JSON.stringify({ error: userError }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Create default categories
      await createDefaultCategories(id)
      
      console.log('Successfully processed user creation and categories')
      
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })

    } catch (error) {
      console.error('Error in webhook processing:', error)
      return new NextResponse(JSON.stringify({ error }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
