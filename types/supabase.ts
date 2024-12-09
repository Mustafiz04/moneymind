export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Category {
  id: string
  name: string
  type: TransactionType
  user_id: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string
  notes: string | null
  tags: string[]
  user_id: string
  category_id: string
  created_at: string
  updated_at: string
  category: Category
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_id: string
          email: string
          name: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          clerk_id: string
          email: string
          name?: string | null
          image_url?: string | null
        }
        Update: {
          clerk_id?: string
          email?: string
          name?: string | null
          image_url?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          type: TransactionType
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          type: TransactionType
          user_id: string
        }
        Update: {
          name?: string
          type?: TransactionType
        }
      }
      transactions: {
        Row: {
          id: string
          type: TransactionType
          amount: number
          date: string
          notes: string | null
          user_id: string
          category_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          type: TransactionType
          amount: number
          date: string
          notes?: string | null
          user_id: string
          category_id: string
        }
        Update: {
          type?: TransactionType
          amount?: number
          date?: string
          notes?: string | null
          category_id?: string
        }
      }
      // ... similar definitions for tags and transactions_tags
    }
  }
} 