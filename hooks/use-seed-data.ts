import { useMutation } from '@tanstack/react-query'

export function useSeedData() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/seed', {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to seed data')
      return response.json()
    }
  })
} 