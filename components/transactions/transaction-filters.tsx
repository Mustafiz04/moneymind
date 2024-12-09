"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"

interface TransactionFiltersProps {
  onFiltersChange: (filters: {
    type: string;
    category: string;
    dateRange: DateRange | undefined;
    searchTag: string;
  }) => void;
}

export function TransactionFilters({ onFiltersChange }: TransactionFiltersProps) {
  const [type, setType] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [searchTag, setSearchTag] = useState("")

  const handleTypeChange = (value: string) => {
    setType(value)
    onFiltersChange({
      type: value,
      category,
      dateRange,
      searchTag
    })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFiltersChange({
      type,
      category: value,
      dateRange,
      searchTag
    })
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    onFiltersChange({
      type,
      category,
      dateRange: range,
      searchTag
    })
  }

  const handleTagSearch = (value: string) => {
    setSearchTag(value)
    onFiltersChange({
      type,
      category,
      dateRange,
      searchTag: value
    })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Transaction type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="transport">Transport</SelectItem>
          <SelectItem value="bills">Bills</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[240px] justify-start text-left font-normal"
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
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Input
        placeholder="Search by tags..."
        value={searchTag}
        onChange={(e) => handleTagSearch(e.target.value)}
        className="w-full md:w-[180px]"
      />
    </div>
  )
} 