"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import { TransactionType } from "@/types/supabase";

interface Filters {
  type: TransactionType | "all";
  category: string;
  dateRange: DateRange | undefined;
  searchTag: string;
}

export default function TransactionsPage() {
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    category: "all",
    dateRange: undefined,
    searchTag: "",
  });

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              View and manage your transactions
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/transactions/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Link>
          </Button>
        </div>

        <TransactionFilters onFiltersChange={handleFiltersChange} />
        <TransactionList
          filters={{
            ...filters,
            dateRange: filters.dateRange
              ? {
                  from: filters.dateRange.from!,
                  to: filters.dateRange.to!,
                }
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
