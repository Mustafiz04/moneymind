import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'

export function useUserSync() {
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    const syncUser = async () => {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          image_url: user.imageUrl,
        }, {
          onConflict: 'clerk_id',
          ignoreDuplicates: true
        })

      if (error) {
        console.error('Error syncing user:', error)
      }
    }

    syncUser()
  }, [user])
} 