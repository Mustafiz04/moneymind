"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useCurrency } from "@/hooks/use-currency"
import { formatCurrency } from "@/lib/format"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300']

interface TagAnalysisProps {
  data: Record<string, number>
}

export function TagAnalysis({ data }: TagAnalysisProps) {
  const { data: currencySymbol = '₹' } = useCurrency()
  
  const chartData = Object.entries(data)
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
        <div className="flex items-center justify-between">
          <CardTitle>Spend by Tag</CardTitle>
          <span className="text-sm font-normal text-muted-foreground">
            Total: {formatCurrency(totalAmount, currencySymbol)}
          </span>
        </div>
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
                    labelFormatter={(name) => `Tag: ${name}`}
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
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.value, currencySymbol)}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No tags found
          </div>
        )}
      </CardContent>
    </Card>
  )
} 