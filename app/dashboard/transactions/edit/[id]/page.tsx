"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { useQuery } from "@tanstack/react-query"
import { Transaction } from "@/types/supabase"

export default function EditTransactionPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()

  const { data: transaction, isLoading } = useQuery({
    queryKey: ['transaction', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch transaction')
      return response.json() as Promise<Transaction>
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!transaction) {
    return <div>Transaction not found</div>
  }

  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Transaction</h1>
          <p className="text-muted-foreground">
            Update your transaction details
          </p>
        </div>

        <TransactionForm 
          defaultValues={{
            type: transaction.type,
            amount: transaction.amount,
            date: new Date(transaction.date),
            category_id: transaction.category_id,
            notes: transaction.notes || undefined
          }}
          transactionId={transaction.id}
        />
      </div>
    </div>
  )
} 