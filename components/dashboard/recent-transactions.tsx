"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { Transaction } from "@/types/supabase"
import { useCurrency } from "@/hooks/use-currency"
import { formatCurrency } from "@/lib/format"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { data: currencySymbol = '₹' } = useCurrency()
  
  return (
    <Card className="border-t-4 border-t-green-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "rounded-full p-2",
                transaction.type === 'INCOME'
                  ? "bg-green-500/10"
                  : "bg-red-500/10"
              )}>
                {transaction.type === 'INCOME' ? (
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.category.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.notes || 'No description'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "text-sm font-medium",
                  transaction.type === 'INCOME'
                    ? "text-green-500"
                    : "text-red-500"
                )}>
                  {transaction.type === 'INCOME' ? "+" : "-"}
                  {formatCurrency(transaction.amount, currencySymbol)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(parseISO(transaction.date), "MMM dd")}
                </span>
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No recent transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 