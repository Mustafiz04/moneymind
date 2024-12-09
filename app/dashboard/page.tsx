import { OverviewCards } from "@/components/dashboard/overview-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionChart } from "@/components/reports/transaction-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

// Sample transactions for the chart
const transactions = [
  {
    id: "1",
    type: "expense",
    amount: 85.50,
    category: "Food",
    tags: "groceries",
    date: new Date("2024-03-15"),
    notes: "Weekly grocery shopping"
  },
  {
    id: "2",
    type: "income",
    amount: 3200.00,
    category: "Salary",
    tags: "work",
    date: new Date("2024-03-01"),
    notes: "Monthly salary"
  },
  // Add more transactions as needed...
]

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Here is an overview of your finances
          </p>
        </div>
        
        <OverviewCards />
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-2">
            <Card className="border-t-4 border-t-blue-500/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionChart period="monthly" transactions={transactions} />
              </CardContent>
            </Card>
          </div>
          <QuickActions />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentTransactions />
          {/* Additional widget can go here */}
        </div>
      </div>
    </div>
  )
} 