import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function updateUserCurrency(userId: string, currencySymbol: string) {
  const supabase = createClientComponentClient()
  
  const { error } = await supabase
    .from('users')
    .update({ currency_symbol: currencySymbol })
    .eq('id', userId)

  if (error) throw error
} 