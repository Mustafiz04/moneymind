import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useCurrency() {
  const { user } = useUser()
  const supabase = createClientComponentClient()

  return useQuery({
    queryKey: ['currency', user?.id],
    queryFn: async () => {
      if (!user?.id) return '₹' // Default to Indian Rupee

      const { data, error } = await supabase
        .from('users')
        .select('currency_symbol')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return data?.currency_symbol || '₹'
    },
    staleTime: Infinity, // Currency preference doesn't change often
  })
} 