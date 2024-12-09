import { DateRange } from "react-day-picker"

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  tags: string;
  date: Date;
  notes: string;
}

export interface ReportFilters {
  period: "daily" | "weekly" | "monthly" | "yearly";
  dateRange: DateRange | undefined;
} 