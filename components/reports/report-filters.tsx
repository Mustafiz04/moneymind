"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import type { ReportFilters } from "@/types"

interface ReportFiltersProps {
  onFiltersChange: (filters: ReportFilters) => void;
}

export function ReportFilters({ onFiltersChange }: ReportFiltersProps) {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const handlePeriodChange = (newPeriod: "daily" | "weekly" | "monthly" | "yearly") => {
    setPeriod(newPeriod)
    onFiltersChange({ period: newPeriod, dateRange })
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    onFiltersChange({ period, dateRange: range })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
          { label: "Yearly", value: "yearly" },
        ].map((p) => (
          <Button
            key={p.value}
            variant={period === p.value ? "default" : "outline"}
            onClick={() => handlePeriodChange(p.value as "daily" | "weekly" | "monthly" | "yearly")}
          >
            {p.label}
          </Button>
        ))}
      </div>

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
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
} 