"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan",
    income: 2400,
    expenses: 1398,
  },
  {
    date: "Feb",
    income: 1398,
    expenses: 2800,
  },
  {
    date: "Mar",
    income: 9800,
    expenses: 2908,
  },
  {
    date: "Apr",
    income: 3908,
    expenses: 2800,
  },
  {
    date: "May",
    income: 4800,
    expenses: 2600,
  },
  {
    date: "Jun",
    income: 3800,
    expenses: 2900,
  },
]

export function OverviewChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="date"
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
          <Tooltip />
          <Line 
            type="monotone"
            dataKey="income"
            stroke="#4ade80"
            strokeWidth={2}
            name="Income"
          />
          <Line 
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 