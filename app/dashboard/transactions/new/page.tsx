"use client"

import { TransactionForm } from "@/components/transactions/transaction-form"
import { useRouter } from "next/navigation"

export default function NewTransactionPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    try {
      // Handle form submission
      console.log(data)
      // After successful submission
      router.push('/dashboard/transactions')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-y-8 max-w-xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Add Transaction</h1>
          <p className="text-muted-foreground">
            Add a new income or expense transaction
          </p>
        </div>

        <TransactionForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
} 