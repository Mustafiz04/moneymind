import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Transaction } from '@/types/supabase'

export function useTransactions() {
  const queryClient = useQueryClient()

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await fetch('/api/transactions')
      if (!response.ok) throw new Error('Failed to fetch transactions')
      return response.json()
    }
  })

  const addTransaction = useMutation({
    mutationFn: async (transaction: Partial<Transaction>) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      })
      if (!response.ok) throw new Error('Failed to add transaction')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return {
    transactions,
    isLoading,
    addTransaction: addTransaction.mutate,
    isAdding: addTransaction.isPending,
  }
} 