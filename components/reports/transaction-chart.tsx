"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Transaction } from "@/types"
import { format, startOfWeek, endOfWeek, getWeek } from "date-fns"
import { DateRange } from "react-day-picker"

interface TransactionChartProps {
  period: string;
  dateRange?: DateRange;
  transactions: Transaction[];
}

export function TransactionChart({ period, dateRange, transactions }: TransactionChartProps) {
  const getFilteredData = () => {
    let filteredTransactions = [...transactions]
    
    // Filter by date range if provided
    if (dateRange?.from) {
      filteredTransactions = filteredTransactions.filter(t => {
        const date = new Date(t.date)
        if (dateRange.to) {
          return date >= dateRange.from && date <= dateRange.to
        }
        return date >= dateRange.from
      })
    }

    // Sort transactions by date
    filteredTransactions.sort((a, b) => a.date.getTime() - b.date.getTime())

    // Group transactions based on period
    const groupedData = new Map()

    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date)
      let key: string

      switch (period) {
        case 'daily':
          key = format(date, 'MMM dd')
          break
        case 'weekly': {
          const weekStart = startOfWeek(date)
          const weekNumber = getWeek(date)
          key = `Week ${weekNumber}`
          break
        }
        case 'monthly':
          key = format(date, 'MMM yyyy')
          break
        case 'yearly':
          key = format(date, 'yyyy')
          break
        default:
          key = format(date, 'MMM dd')
      }

      if (!groupedData.has(key)) {
        groupedData.set(key, { name: key, income: 0, expenses: 0 })
      }

      const entry = groupedData.get(key)
      if (transaction.type === 'income') {
        entry.income += transaction.amount
      } else {
        entry.expenses += transaction.amount
      }
    })

    return Array.from(groupedData.values())
  }

  const chartData = getFilteredData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
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
                tickFormatter={(value) => `$${value}`}
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
                  `$${value.toFixed(2)}`,
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
                dataKey="expenses" 
                name="Expenses"
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 