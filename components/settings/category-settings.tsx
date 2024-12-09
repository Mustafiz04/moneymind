"use client"

import { useState } from "react"
import { useCategories } from "@/hooks/use-categories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { Category, TransactionType } from "@/types/supabase"

export function CategorySettings() {
  const { categories, isLoading, addCategory, isAdding, deleteCategory } = useCategories()
  const [newCategory, setNewCategory] = useState("")
  const [type, setType] = useState<TransactionType>("EXPENSE")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    addCategory(
      { name: newCategory.trim(), type },
      {
        onSuccess: () => {
          setNewCategory("")
        },
      }
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4"
            >
            <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full"
            />
            <Select
                value={type}
                onValueChange={(value) => setType(value as TransactionType)}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" disabled={isAdding} className="w-full sm:w-auto">
                Add Category
            </Button>
        </form>

        <div className="space-y-4">
          <h3 className="font-medium">Income Categories</h3>
          <div className="grid gap-2">
            {categories
              ?.filter((cat: Category) => cat.type === "INCOME")
              .map((category: Category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span>{category.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Expense Categories</h3>
          <div className="grid gap-2">
            {categories
              ?.filter((cat: Category) => cat.type === "EXPENSE")
              .map((category: Category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span>{category.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 