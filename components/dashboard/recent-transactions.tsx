import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const recentTransactions = [
  {
    id: "1",
    type: "expense",
    amount: 85.50,
    category: "Food",
    date: new Date("2024-03-15"),
    description: "Weekly grocery shopping"
  },
  {
    id: "2",
    type: "income",
    amount: 3200.00,
    category: "Salary",
    date: new Date("2024-03-14"),
    description: "Monthly salary"
  },
  {
    id: "3",
    type: "expense",
    amount: 45.00,
    category: "Transport",
    date: new Date("2024-03-13"),
    description: "Gas refill"
  },
  {
    id: "4",
    type: "expense",
    amount: 120.00,
    category: "Entertainment",
    date: new Date("2024-03-12"),
    description: "Movie night"
  }
]

export function RecentTransactions() {
  return (
    <Card className="border-t-4 border-t-green-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "rounded-full p-2",
                transaction.type === "income" 
                  ? "bg-green-500/10" 
                  : "bg-red-500/10"
              )}>
                {transaction.type === "income" ? (
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "text-sm font-medium",
                  transaction.type === "income" 
                    ? "text-green-500" 
                    : "text-red-500"
                )}>
                  {transaction.type === "income" ? "+" : "-"}
                  ${transaction.amount.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(transaction.date, "MMM dd")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 