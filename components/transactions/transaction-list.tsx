"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTransactionsList } from "@/hooks/use-transactions-list";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCurrency } from "@/hooks/use-currency";
import { formatCurrency } from "@/lib/format";

interface TransactionListProps {
  filters: {
    type: string;
    category: string;
    dateRange: { from: Date; to: Date } | undefined;
    searchTag: string;
  };
}

export function TransactionList({ filters }: TransactionListProps) {
  const router = useRouter();
  const { transactions, isLoading, deleteTransaction, isDeleting } =
    useTransactionsList(filters);

const { data: currencySymbol = "₹" } = useCurrency();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/transactions/edit/${id}`);
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    try {
      await deleteTransaction(id, {
        onSuccess: () => {
          console.log("Transaction deleted successfully");
        },
        onError: (error) => {
          console.error("Failed to delete transaction:", error);
        },
      });
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative rounded-md border">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[800px]">
          {" "}
          {/* Minimum width to prevent squishing */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[150px]">Category</TableHead>
                <TableHead className="w-[120px]">Amount</TableHead>
                <TableHead className="min-w-[200px]">Notes</TableHead>
                <TableHead className="min-w-[200px]">Tags</TableHead>
                <TableHead className="w-[70px] sticky right-0 bg-background">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.type.toLowerCase()}
                  </TableCell>
                  <TableCell>{transaction.category.name}</TableCell>
                  <TableCell
                    className={
                      transaction.type === "INCOME"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}
                    {formatCurrency(transaction.amount, currencySymbol)}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {transaction.notes}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {transaction.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="sticky right-0 bg-background">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(transaction.id)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-red-600"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Transaction
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this
                                transaction? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => handleDelete(transaction.id, e)}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {transactions?.map((transaction) => (
          <div key={transaction.id} className="border-b p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {format(new Date(transaction.date), "MMM dd, yyyy")}
              </span>
              <span
                className={cn(
                  "font-medium",
                  transaction.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {transaction.type === "INCOME" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="capitalize">
                {transaction.type.toLowerCase()}
              </span>
              <span>{transaction.category.name}</span>
            </div>
            {transaction.notes && (
              <div className="text-sm text-muted-foreground">
                {transaction.notes}
              </div>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              {transaction.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="text-red-600"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this transaction? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => handleDelete(transaction.id, e)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
