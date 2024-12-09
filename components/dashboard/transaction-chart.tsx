"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Transaction } from "@/types/supabase"
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from "date-fns"
import { useCurrency } from "@/hooks/use-currency"

interface TransactionChartProps {
  transactions: Transaction[]
}

export function TransactionChart({ transactions }: TransactionChartProps) {
  const { data: currencySymbol = '₹' } = useCurrency()
  
  // Get last 6 months range
  const endDate = endOfMonth(new Date())
  const startDate = startOfMonth(subMonths(endDate, 5))
  
  // Get array of months
  const months = eachMonthOfInterval({ start: startDate, end: endDate })

  // Create data for each month
  const chartData = months.map(month => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)

    // Filter transactions for this month
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date)
      return date >= monthStart && date <= monthEnd
    })

    // Calculate totals
    const monthData = {
      name: format(month, 'MMM yyyy'),
      income: 0,
      expense: 0
    }

    monthTransactions.forEach(transaction => {
      if (transaction.type === 'INCOME') {
        monthData.income += transaction.amount
      } else {
        monthData.expense += transaction.amount
      }
    })

    return monthData
  })

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${currencySymbol}${value}`}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              padding: '0.75rem'
            }}
            labelStyle={{
              color: 'hsl(var(--foreground))',
              fontWeight: 600,
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}
            itemStyle={{
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.875rem',
              padding: '0.25rem 0'
            }}
            formatter={(value: number) => [
              `${currencySymbol}${value.toFixed(2)}`,
            ]}
            labelFormatter={(label) => `Period: ${label}`}
          />
          <Bar 
            dataKey="income" 
            name="Income"
            fill="#4ade80" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="expense" 
            name="Expenses"
            fill="#ef4444" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 