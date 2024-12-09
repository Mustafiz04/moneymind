"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useCategories } from "@/hooks/use-categories"
import { TransactionType } from "@/types/supabase"
import { Category } from "@/types/supabase"

interface TransactionFiltersProps {
  onFiltersChange: (filters: {
    type: TransactionType | 'all'
    category: string
    dateRange: DateRange | undefined
    searchTag: string
  }) => void
}

export function TransactionFilters({ onFiltersChange }: TransactionFiltersProps) {
  const [type, setType] = useState<TransactionType | 'all'>('all')
  const [category, setCategory] = useState('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [searchTag, setSearchTag] = useState('')
  const { categories } = useCategories()


  // Filter categories based on selected type
  const filteredCategories = categories?.filter((cat: Category) => 
    type === 'all' ? true : cat.type === type
  )

  const handleTypeChange = (newType: TransactionType | 'all') => {
    setType(newType)
    setCategory('all') // Reset category when type changes
    onFiltersChange({ type: newType, category, dateRange, searchTag })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="INCOME">Income</SelectItem>
          <SelectItem value="EXPENSE">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={category}
        onValueChange={(value) => {
          setCategory(value)
          onFiltersChange({ type, category: value, dateRange, searchTag })
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {filteredCategories?.map((category: Category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range)
                onFiltersChange({ type, category, dateRange: range, searchTag })
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Input
        placeholder="Search by tag..."
        value={searchTag}
        onChange={(e) => {
          setSearchTag(e.target.value)
          onFiltersChange({ type, category, dateRange, searchTag: e.target.value })
        }}
        className="w-[200px]"
      />
    </div>
  )
} 