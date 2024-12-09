"use client"

import { useTransactions } from "@/hooks/use-transactions"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionChart } from "@/components/dashboard/transaction-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { transactions, isLoading } = useTransactions()

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-y-8">
          <div>
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-[120px]" />
            <Skeleton className="h-[120px]" />
            <Skeleton className="h-[120px]" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-[400px] col-span-2" />
            <Skeleton className="h-[400px]" />
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    )
  }

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

        <OverviewCards transactions={transactions} />
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-2">
            <Card className="border-t-4 border-t-blue-500/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionChart transactions={transactions} />
              </CardContent>
            </Card>
          </div>
          <QuickActions />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  )
} 