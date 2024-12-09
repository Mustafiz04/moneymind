import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Transaction, TransactionType } from '@/types/supabase'

interface TransactionFilters {
  type: string
  category: string
  dateRange?: { from: Date; to: Date } | undefined
  searchTag: string
}

interface UpdateTransactionData {
  id: string
  type: TransactionType
  amount: number
  date: Date
  notes?: string
  category_id: string
}

export function useTransactionsList(filters: TransactionFilters) {
  const queryClient = useQueryClient()

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const response = await fetch('/api/transactions')
      if (!response.ok) throw new Error('Failed to fetch transactions')
      const data: Transaction[] = await response.json()
      return data.filter(transaction => {
        // Filter by type
        if (filters.type !== 'all' && transaction.type !== filters.type) {
          return false
        }

        // Filter by category
        if (filters.category !== 'all' && 
            transaction.category.id !== filters.category) {
          return false
        }

        // Filter by date range
        if (filters.dateRange?.from) {
          const transactionDate = new Date(transaction.date)
          if (filters.dateRange.to) {
            if (transactionDate < filters.dateRange.from || 
                transactionDate > filters.dateRange.to) {
              return false
            }
          } else if (transactionDate < filters.dateRange.from) {
            return false
          }
        }

        return true
      })
    }
  })

  const updateTransaction = useMutation({
    mutationFn: async (data: UpdateTransactionData) => {
      const { id, ...updateData } = data
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updateData,
          date: updateData.date.toISOString(),
        }),
      })
      if (!response.ok) throw new Error('Failed to update transaction')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete transaction')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return {
    transactions,
    isLoading,
    updateTransaction: updateTransaction.mutate,
    isUpdating: updateTransaction.isPending,
    deleteTransaction: deleteTransaction.mutate,
    isDeleting: deleteTransaction.isPending,
  }
} 