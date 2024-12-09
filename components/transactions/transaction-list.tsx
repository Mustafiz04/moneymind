"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { format } from "date-fns"
import { Transaction } from "@/types"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"

const transactions = [
  {
    id: "1",
    type: "expense",
    amount: 85.50,
    category: "Food",
    tags: "groceries, food",
    date: new Date("2024-03-15"),
    notes: "Weekly grocery shopping"
  },
  {
    id: "2",
    type: "income",
    amount: 3200.00,
    category: "Salary",
    tags: "work",
    date: new Date("2024-03-14"),
    notes: "Monthly salary"
  },
  // Add more sample transactions...
]

interface TransactionListProps {
  filters: {
    type: string;
    category: string;
    dateRange: DateRange | undefined;
    searchTag: string;
  }
}

export function TransactionList({ filters }: TransactionListProps) {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  useEffect(() => {
    let filtered = [...transactions]

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type)
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === filters.category)
    }

    // Filter by date range
    if (filters.dateRange?.from) {
      const fromDate = filters.dateRange.from
      const toDate = filters.dateRange.to
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date)
        if (toDate) {
          return transactionDate >= fromDate && transactionDate <= toDate
        }
        return transactionDate >= fromDate
      })
    }

    // Filter by tag search
    if (filters.searchTag) {
      filtered = filtered.filter(t => 
        t.tags.toLowerCase().includes(filters.searchTag.toLowerCase())
      )
    }

    setFilteredTransactions(filtered)
  }, [filters])

  return (
    <div className="rounded-md border overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.tags}</TableCell>
                <TableCell>{transaction.notes}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border-b p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {format(new Date(transaction.date), "MMM dd, yyyy")}
              </span>
              <span className={cn(
                "font-medium",
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              )}>
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="capitalize">{transaction.type}</span>
              <span>{transaction.category}</span>
            </div>
            {transaction.tags && (
              <div className="text-sm text-muted-foreground">
                Tags: {transaction.tags}
              </div>
            )}
            {transaction.notes && (
              <div className="text-sm text-muted-foreground">
                {transaction.notes}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 