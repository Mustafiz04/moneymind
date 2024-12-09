"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"
import { Transaction } from "@/types/supabase"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/hooks/use-currency"
import { formatCurrency } from "@/lib/format"

interface OverviewCardsProps {
  transactions: Transaction[]
}

export function OverviewCards({ transactions }: OverviewCardsProps) {
  const { data: currencySymbol = '₹' } = useCurrency()

  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'INCOME') {
        acc.income += transaction.amount
      } else {
        acc.expenses += transaction.amount
      }
      return acc
    },
    { income: 0, expenses: 0 }
  )

  const netIncome = totals.income - totals.expenses

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-t-4 border-t-green-500/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {formatCurrency(totals.income, currencySymbol)}
          </div>
        </CardContent>
      </Card>
      <Card className="border-t-4 border-t-red-500/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {formatCurrency(totals.expenses, currencySymbol)}
          </div>
        </CardContent>
      </Card>
      <Card className="border-t-4 border-t-blue-500/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          <DollarSign className={cn(
            "h-4 w-4",
            netIncome >= 0 ? "text-green-500" : "text-red-500"
          )} />
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-2xl font-bold",
            netIncome >= 0 ? "text-green-500" : "text-red-500"
          )}>
            {formatCurrency(netIncome, currencySymbol)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 