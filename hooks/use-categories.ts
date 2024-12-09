import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TransactionType } from '@/types/supabase'

interface Category {
  id: string
  name: string
  type: TransactionType
  user_id: string
}

export function useCategories() {
  const queryClient = useQueryClient()

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json()
    }
  })

  const addCategory = useMutation({
    mutationFn: async (category: { name: string; type: TransactionType }) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })
      if (!response.ok) throw new Error('Failed to add category')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await fetch(`/api/categories?id=${categoryId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete category')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return {
    categories,
    isLoading,
    addCategory: addCategory.mutate,
    isAdding: addCategory.isPending,
    deleteCategory: deleteCategory.mutate,
    isDeleting: deleteCategory.isPending,
  }
} 