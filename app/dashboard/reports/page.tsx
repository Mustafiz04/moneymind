"use client"

import { useState } from "react"
import { ReportFilters } from "@/components/reports/report-filters"
import { TransactionChart } from "@/components/reports/transaction-chart"
import { CategoryAnalysis } from "@/components/reports/category-analysis"
import { TagAnalysis } from "@/components/reports/tag-analysis"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { DateRange } from "react-day-picker"
import { exportToCSV, exportToPDF } from "@/lib/export-utils"
import { useReports } from "@/hooks/use-reports"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrency } from "@/hooks/use-currency"

export default function ReportsPage() {
  const { data: currencySymbol = "₹" } = useCurrency();

  const [filters, setFilters] = useState({
    period: "monthly" as "monthly" | "daily" | "weekly" | "yearly",
    dateRange: undefined as DateRange | undefined
  })

  const { data: reportData, isLoading, error } = useReports(filters)

  console.log('Category Totals:', reportData?.categoryTotals)
  console.log('Tag Totals:', reportData?.tagTotals)

  const handleExportCSV = () => {
    if (!reportData?.transactions) return
    exportToCSV(reportData.transactions, currencySymbol)
  }

  const handleExportPDF = () => {
    if (!reportData?.transactions) return
    exportToPDF(reportData.transactions, currencySymbol)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-destructive">Error loading reports. Please try again later.</p>
      </div>
    )
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
              disabled={isLoading || !reportData}
              className="w-full sm:w-auto"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              disabled={isLoading || !reportData}
              className="w-full sm:w-auto"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <ReportFilters onFiltersChange={setFilters} />
        
        <div className="grid gap-6">
          {isLoading ? (
            <>
              <Skeleton className="h-[400px] w-full" />
              <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[300px]" />
                <Skeleton className="h-[300px]" />
              </div>
            </>
          ) : (
            <>
              <TransactionChart 
                period={filters.period} 
                dateRange={filters.dateRange}
                data={reportData?.timeSeriesData.map(item => ({
                    date: item.name,
                    income: item.income,
                    expense: item.expense
                })) || []}
                />
              
              <div className="grid gap-6 md:grid-cols-2">
                <CategoryAnalysis 
                  data={reportData?.categoryTotals || { expenses: {}, income: {} }} 
                />
                <TagAnalysis 
                  data={reportData?.tagTotals || {}} 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 