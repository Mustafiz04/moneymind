"use client"

import { useState } from "react"
import { TransactionList } from "@/components/transactions/transaction-list"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DateRange } from "react-day-picker"

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateRange: undefined as DateRange | undefined,
    searchTag: ""
  })

  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              Manage your income and expenses
            </p>
          </div>
          <Button asChild className="sm:self-start">
            <Link href="/dashboard/transactions/new" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Link>
          </Button>
        </div>

        <TransactionFilters onFiltersChange={setFilters} />
        <TransactionList filters={filters} />
      </div>
    </div>
  )
} 