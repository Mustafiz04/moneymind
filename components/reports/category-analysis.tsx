"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useCurrency } from "@/hooks/use-currency"
import { formatCurrency } from "@/lib/format"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300']

interface CategoryAnalysisProps {
  data: {
    expenses: Record<string, number>
    income: Record<string, number>
  }
}

export function CategoryAnalysis({ data = { expenses: {}, income: {} } }: CategoryAnalysisProps) {
  const [activeType, setActiveType] = useState<'expenses' | 'income'>('expenses')
  const { data: currencySymbol = '₹' } = useCurrency()

  const currentData = data[activeType] || {}

  // Get top 10 categories by amount
  const chartData = Object.entries(currentData)
    .map(([name, value]) => ({
      name,
      value: Number(value)
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>Top 10 Categories</CardTitle>
          <span className="text-sm font-normal text-muted-foreground">
            Total: {currencySymbol}{totalAmount.toFixed(2)}
          </span>
        </div>
        <Tabs value={activeType} onValueChange={(v) => setActiveType(v as 'expenses' | 'income')} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${currencySymbol}${value.toFixed(2)}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      padding: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    itemStyle={{
                      color: 'hsl(var(--foreground))'
                    }}
                    labelStyle={{
                      color: 'hsl(var(--foreground))',
                      fontWeight: 500,
                      marginBottom: '4px'
                    }}
                    labelFormatter={(name) => `Category: ${name}`}
                    wrapperStyle={{
                      outline: 'none'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(item.value, currencySymbol)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({((item.value / totalAmount) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No {activeType} categories found
          </div>
        )}
      </CardContent>
    </Card>
  )
} 