"use client"

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function useUserSync() {
  const { user } = useUser()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!user?.id) return

    const createUser = async () => {
      try {
        // First, check if user exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single()

        if (existingUser) return // User already exists

        // Create user if doesn't exist
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            clerk_id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            image_url: user.imageUrl,
            currency_symbol: '₹'
          })

        if (userError) throw userError

        // Create default categories
        await createDefaultCategories(user.id)
      } catch (error) {
        console.error('Error syncing user:', error)
      }
    }

    createUser()
  }, [user])
}

async function createDefaultCategories(userId: string) {
  const supabase = createClientComponentClient()
  const DEFAULT_CATEGORIES = [
    // Income categories
    { name: 'Salary', type: 'INCOME' },
    { name: 'Freelance', type: 'INCOME' },
    { name: 'Investments', type: 'INCOME' },
    { name: 'Other Income', type: 'INCOME' },
    
    // Expense categories
    { name: 'Food & Dining', type: 'EXPENSE' },
    { name: 'Rent', type: 'EXPENSE' },
    { name: 'Utilities', type: 'EXPENSE' },
    { name: 'Transportation', type: 'EXPENSE' },
    { name: 'Shopping', type: 'EXPENSE' },
    { name: 'Entertainment', type: 'EXPENSE' },
    { name: 'Healthcare', type: 'EXPENSE' },
    { name: 'Education', type: 'EXPENSE' },
    { name: 'Travel', type: 'EXPENSE' },
    { name: 'Insurance', type: 'EXPENSE' },
    { name: 'Other Expenses', type: 'EXPENSE' },
  ]

  try {
    const { error } = await supabase
      .from('categories')
      .insert(DEFAULT_CATEGORIES.map(category => ({
        name: category.name,
        type: category.type,
        user_id: userId
      })))

    if (error) throw error
  } catch (error) {
    console.error('Error creating default categories:', error)
  }
} 