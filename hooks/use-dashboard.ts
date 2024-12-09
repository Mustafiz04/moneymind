import { useQuery } from '@tanstack/react-query'
import { Transaction } from '@/types/supabase'
import { startOfMonth, endOfMonth, format } from 'date-fns'

interface DashboardData {
  totalIncome: number
  totalExpense: number
  netIncome: number
  recentTransactions: Transaction[]
  monthlyData: {
    name: string
    income: number
    expense: number
  }[]
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/transactions')
      if (!response.ok) throw new Error('Failed to fetch transactions')
      const transactions: Transaction[] = await response.json()

      const currentDate = new Date()
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(currentDate)

      // Filter current month transactions
      const currentMonthTransactions = transactions.filter(t => {
        const date = new Date(t.date)
        return date >= monthStart && date <= monthEnd
      })

      // Calculate totals
      const data: DashboardData = {
        totalIncome: 0,
        totalExpense: 0,
        netIncome: 0,
        recentTransactions: transactions.slice(0, 5), // Get 5 most recent transactions
        monthlyData: []
      }

      currentMonthTransactions.forEach(transaction => {
        if (transaction.type === 'INCOME') {
          data.totalIncome += transaction.amount
        } else {
          data.totalExpense += transaction.amount
        }
      })

      data.netIncome = data.totalIncome - data.totalExpense

      // Group by month for chart
      const monthlyGroups = transactions.reduce((acc, transaction) => {
        const monthKey = format(new Date(transaction.date), 'MMM yyyy')
        if (!acc[monthKey]) {
          acc[monthKey] = { income: 0, expense: 0 }
        }
        if (transaction.type === 'INCOME') {
          acc[monthKey].income += transaction.amount
        } else {
          acc[monthKey].expense += transaction.amount
        }
        return acc
      }, {} as Record<string, { income: number; expense: number }>)

      data.monthlyData = Object.entries(monthlyGroups)
        .map(([name, values]) => ({
          name,
          ...values
        }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
        .slice(-6) // Last 6 months

      return data
    }
  })
} 