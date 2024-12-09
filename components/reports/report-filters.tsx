"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface ReportFiltersProps {
  onFiltersChange: (filters: {
    period: "daily" | "weekly" | "monthly" | "yearly";
    dateRange: DateRange | undefined;
  }) => void;
}

export function ReportFilters({ onFiltersChange }: ReportFiltersProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  const handlePeriodChange = (
    period: "daily" | "weekly" | "monthly" | "yearly"
  ) => {
    onFiltersChange({ period, dateRange: date });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    onFiltersChange({ period: "daily", dateRange: range });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Tabs
        defaultValue="monthly"
        className="w-full sm:w-[400px]"
        onValueChange={(value) =>
          handlePeriodChange(value as "daily" | "weekly" | "monthly" | "yearly")
        }
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
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
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
