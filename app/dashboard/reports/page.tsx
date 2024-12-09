"use client"

import { useState } from "react"
import { ReportFilters } from "@/components/reports/report-filters"
import { TransactionChart } from "@/components/reports/transaction-chart"
import { CategoryAnalysis } from "@/components/reports/category-analysis"
import { TagAnalysis } from "@/components/reports/tag-analysis"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Transaction } from "@/types"
import { exportToCSV, exportToPDF } from "@/lib/export-utils"

// Sample data with transactions across different months
const transactions: Transaction[] = [
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
  {
    id: "3",
    type: "expense",
    amount: 45.00,
    category: "Transport",
    tags: "fuel",
    date: new Date("2024-03-10"),
    notes: "Gas refill"
  },
  {
    id: "4",
    type: "expense",
    amount: 120.00,
    category: "Entertainment",
    tags: "movies",
    date: new Date("2024-02-28"),
    notes: "Movie night"
  },
  {
    id: "5",
    type: "income",
    amount: 500.00,
    category: "Freelance",
    tags: "work",
    date: new Date("2024-02-15"),
    notes: "Freelance project"
  },
  {
    id: "6",
    type: "expense",
    amount: 95.00,
    category: "Food",
    tags: "restaurant",
    date: new Date("2024-02-10"),
    notes: "Dinner out"
  },
  {
    id: "7",
    type: "income",
    amount: 3200.00,
    category: "Salary",
    tags: "work",
    date: new Date("2024-02-01"),
    notes: "Monthly salary"
  },
  {
    id: "8",
    type: "expense",
    amount: 200.00,
    category: "Shopping",
    tags: "clothes",
    date: new Date("2024-01-20"),
    notes: "Winter clothes"
  }
]

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    period: "monthly" as "daily" | "weekly" | "monthly" | "yearly",
    dateRange: undefined as DateRange | undefined
  })

  const handleExportCSV = () => {
    const filteredTransactions = transactions.filter(t => {
      if (!filters.dateRange?.from) return true
      const date = new Date(t.date)
      if (filters.dateRange.to) {
        return date >= filters.dateRange.from && date <= filters.dateRange.to
      }
      return date >= filters.dateRange.from
    })
    exportToCSV(filteredTransactions)
  }

  const handleExportPDF = () => {
    const filteredTransactions = transactions.filter(t => {
      if (!filters.dateRange?.from) return true
      const date = new Date(t.date)
      if (filters.dateRange.to) {
        return date >= filters.dateRange.from && date <= filters.dateRange.to
      }
      return date >= filters.dateRange.from
    })
    exportToPDF(filteredTransactions)
  }

  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              Analyze your financial activity
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              className="w-full sm:w-auto"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="w-full sm:w-auto"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <ReportFilters onFiltersChange={setFilters} />
        
        <div className="grid gap-6">
          <TransactionChart 
            period={filters.period} 
            dateRange={filters.dateRange}
            transactions={transactions}
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryAnalysis transactions={transactions} dateRange={filters.dateRange} />
            <TagAnalysis transactions={transactions} dateRange={filters.dateRange} />
          </div>
        </div>
      </div>
    </div>
  )
} 