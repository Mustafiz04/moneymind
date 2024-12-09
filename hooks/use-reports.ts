import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Transaction } from '@/types/supabase'
import { startOfDay, endOfDay, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { queryClient } from "@/lib/query-client"

interface ReportFilters {
  period: "daily" | "weekly" | "monthly" | "yearly"
  dateRange: DateRange | undefined
}

export function useReports(filters: ReportFilters) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['reports', filters],
    queryFn: async () => {
      try {
        const response = await fetch('/api/transactions')
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        const transactions: Transaction[] = await response.json()

        // Filter transactions by date range if provided
        const filteredTransactions = transactions.filter(transaction => {
          if (!filters.dateRange?.from) return true
          const transactionDate = new Date(transaction.date)
          const fromDate = startOfDay(filters.dateRange.from)
          const toDate = filters.dateRange.to ? endOfDay(filters.dateRange.to) : undefined

          return toDate 
            ? transactionDate >= fromDate && transactionDate <= toDate
            : transactionDate >= fromDate
        })

        // Calculate category totals
        const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
          const type = transaction.type === 'INCOME' ? 'income' : 'expenses'
          const categoryName = transaction.category.name

          if (!acc[type]) {
            acc[type] = {}
          }
          
          if (!acc[type][categoryName]) {
            acc[type][categoryName] = 0
          }
          acc[type][categoryName] += transaction.amount

          return acc
        }, { income: {}, expenses: {} } as { income: Record<string, number>, expenses: Record<string, number> })

        // Format for the UI
        const formattedCategories = {
          expenses: categoryTotals.expenses,
          income: categoryTotals.income
        }

        // Calculate tag totals (only for expenses)
        const tagTotals = filteredTransactions.reduce((acc, transaction) => {
          if (transaction.tags && transaction.tags.length > 0) {
            transaction.tags.forEach(tag => {
              const trimmedTag = tag.trim()
              if (trimmedTag) {
                if (!acc[trimmedTag]) acc[trimmedTag] = 0
                acc[trimmedTag] += transaction.amount
              }
            })
          }
          return acc
        }, {} as Record<string, number>)

        // Group transactions by period
        const groupedData = filteredTransactions.reduce((acc, transaction) => {
          let key: string
          const date = new Date(transaction.date)
          
          switch (filters.period) {
            case 'daily':
              key = format(date, 'MMM dd')
              break
            case 'weekly':
              key = `Week ${format(date, 'w')}`
              break
            case 'monthly':
              key = format(date, 'MMM yyyy')
              break
            case 'yearly':
              key = format(date, 'yyyy')
              break
          }

          if (!acc[key]) {
            acc[key] = { income: 0, expense: 0 }
          }

          if (transaction.type === 'INCOME') {
            acc[key].income += transaction.amount
          } else {
            acc[key].expense += transaction.amount
          }

          return acc
        }, {} as Record<string, { income: number; expense: number }>)

        return {
          transactions: filteredTransactions,
          categoryTotals,
          tagTotals,
          timeSeriesData: Object.entries(groupedData).map(([date, data]) => ({
            name: date,
            ...data
          }))
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export const invalidateReports = () => {
  queryClient.invalidateQueries({ queryKey: ['reports'] })
} 