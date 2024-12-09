import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TransactionType } from '@/types/supabase'

interface TransactionFormData {
  type: TransactionType
  amount: number
  date: Date
  notes?: string
  category_id: string
}

export function useTransactionsForm() {
  const queryClient = useQueryClient()

  const addTransaction = useMutation({
    mutationFn: async (data: TransactionFormData) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString(),
        }),
      })
      if (!response.ok) throw new Error('Failed to add transaction')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  return {
    addTransaction: addTransaction.mutate,
    isAdding: addTransaction.isPending,
    error: addTransaction.error
  }
} 