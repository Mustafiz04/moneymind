"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Transaction } from "@/types"
import { format, startOfWeek, endOfWeek, getWeek } from "date-fns"
import { DateRange } from "react-day-picker"
import { useCurrency } from "@/hooks/use-currency"

interface ChartProps {
  period: string
  dateRange?: DateRange
  data: Array<{
    date: string
    income: number
    expense: number
  }>
}

export function TransactionChart({ data }: ChartProps) {
  const { data: currencySymbol = "₹" } = useCurrency();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
                dataKey="expense" 
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