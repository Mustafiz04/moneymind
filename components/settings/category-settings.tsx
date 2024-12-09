"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

type Category = {
  id: string
  name: string
  type: "income" | "expense"
}

export function CategorySettings() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Salary", type: "income" },
    { id: "2", name: "Food", type: "expense" },
    { id: "3", name: "Transport", type: "expense" },
  ])
  const [newCategory, setNewCategory] = useState("")
  const [selectedType, setSelectedType] = useState<"income" | "expense">("expense")

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now().toString(), name: newCategory, type: selectedType },
      ])
      setNewCategory("")
    }
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setSelectedType("income")}>
            Income
          </Button>
          <Button variant="outline" onClick={() => setSelectedType("expense")}>
            Expense
          </Button>
          <Button onClick={addCategory}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Income Categories</h3>
          <div className="space-y-2">
            {categories
              .filter((cat) => cat.type === "income")
              .map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <span>{category.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>

          <h3 className="font-semibold">Expense Categories</h3>
          <div className="space-y-2">
            {categories
              .filter((cat) => cat.type === "expense")
              .map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <span>{category.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 