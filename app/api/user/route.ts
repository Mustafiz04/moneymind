import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DEFAULT_CATEGORIES } from '@/lib/constants'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { user_id } = await request.json()

  try {
    // Create user
    const { error: userError } = await supabase
      .from('users')
      .insert([
        { 
          id: user_id,
          currency_symbol: '₹'
        }
      ])

    if (userError) throw userError

    // Create default categories
    const { error: categoryError } = await supabase
      .from('categories')
      .insert(
        DEFAULT_CATEGORIES.map(category => ({
          name: category.name,
          type: category.type,
          user_id: user_id
        }))
      )

    if (categoryError) throw categoryError

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in user creation:', error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 