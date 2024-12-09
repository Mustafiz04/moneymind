import { supabase } from '@/lib/supabase'
import { TransactionType } from '@/types/supabase'

const DEFAULT_CATEGORIES = [
  // Income Categories
  { name: 'Salary', type: 'INCOME' },
  { name: 'Freelance', type: 'INCOME' },
  { name: 'Investments', type: 'INCOME' },
  { name: 'Rental Income', type: 'INCOME' },
  { name: 'Other Income', type: 'INCOME' },

  // Expense Categories
  { name: 'Food & Dining', type: 'EXPENSE' },
  { name: 'Groceries', type: 'EXPENSE' },
  { name: 'Transportation', type: 'EXPENSE' },
  { name: 'Rent/Mortgage', type: 'EXPENSE' },
  { name: 'Utilities', type: 'EXPENSE' },
  { name: 'Healthcare', type: 'EXPENSE' },
  { name: 'Insurance', type: 'EXPENSE' },
  { name: 'Shopping', type: 'EXPENSE' },
  { name: 'Entertainment', type: 'EXPENSE' },
  { name: 'Education', type: 'EXPENSE' },
  { name: 'Travel', type: 'EXPENSE' },
  { name: 'Subscriptions', type: 'EXPENSE' },
  { name: 'Personal Care', type: 'EXPENSE' },
  { name: 'Home Maintenance', type: 'EXPENSE' },
  { name: 'Gifts & Donations', type: 'EXPENSE' },
]

const DEFAULT_TAGS = [
  'essential',
  'non-essential',
  'recurring',
  'one-time',
  'business',
  'personal',
  'family',
  'health',
  'savings',
  'emergency',
  'vacation',
  'education',
  'bills',
  'entertainment',
  'shopping',
  'food',
  'transport',
  'home',
  'work',
  'investment'
]

export async function seedDefaultData(userId: string) {
  try {
    // Insert default categories
    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert(
        DEFAULT_CATEGORIES.map(category => ({
          name: category.name,
          type: category.type as TransactionType,
          user_id: userId
        })),
        { onConflict: 'name,user_id' }
      )

    if (categoriesError) {
      throw new Error(`Error seeding categories: ${categoriesError.message}`)
    }

    // Insert default tags
    const { error: tagsError } = await supabase
      .from('tags')
      .upsert(
        DEFAULT_TAGS.map(tag => ({
          name: tag,
          user_id: userId
        })),
        { onConflict: 'name,user_id' }
      )

    if (tagsError) {
      throw new Error(`Error seeding tags: ${tagsError.message}`)
    }

    console.log('Successfully seeded default categories and tags')
    return true
  } catch (error) {
    console.error('Error seeding data:', error)
    return false
  }
} 