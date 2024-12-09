"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { updateUserCurrency } from "@/lib/supabase"

const currencies = [
  { symbol: "₹", name: "Indian Rupee" },
  { symbol: "$", name: "US Dollar" },
  { symbol: "€", name: "Euro" },
  { symbol: "£", name: "British Pound" },
  { symbol: "¥", name: "Japanese Yen" },
  { symbol: "A$", name: "Australian Dollar" },
  { symbol: "C$", name: "Canadian Dollar" },
  { symbol: "Fr", name: "Swiss Franc" },
  { symbol: "¥", name: "Chinese Yuan" },
  { symbol: "HK$", name: "Hong Kong Dollar" },
  { symbol: "NZ$", name: "New Zealand Dollar" },
  { symbol: "S$", name: "Singapore Dollar" },
  { symbol: "د.إ", name: "UAE Dirham" },
  { symbol: "﷼", name: "Saudi Riyal" },
  { symbol: "R", name: "South African Rand" },
  { symbol: "R$", name: "Brazilian Real" },
  { symbol: "$", name: "Mexican Peso" },
  { symbol: "₽", name: "Russian Ruble" },
  { symbol: "₩", name: "South Korean Won" },
  { symbol: "฿", name: "Thai Baht" }
]

export function CurrencySettings() {
  const { user } = useUser()
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')

  // Fetch current currency setting
  const { data: currentCurrency } = useQuery({
    queryKey: ['currency', user?.id],
    queryFn: async () => {
      if (!user?.id) return '₹'
      
      const { data, error } = await supabase
        .from('users')
        .select('currency_symbol')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setSelectedCurrency(data?.currency_symbol || '₹')
      return data?.currency_symbol || '₹'
    }
  })

  const handleCurrencyChange = async (symbol: string) => {
    if (!user?.id) return
    setLoading(true)
    setSelectedCurrency(symbol)

    try {
      await updateUserCurrency(user.id, symbol)

      toast({
        title: "Currency updated",
        description: "Your currency preference has been updated successfully.",
      })

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['currency'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    } catch (error) {
      setSelectedCurrency(currentCurrency || '₹')
      toast({
        title: "Error",
        description: "Failed to update currency. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Default Currency</Label>
          <Select 
            value={selectedCurrency}
            onValueChange={handleCurrencyChange}
            disabled={loading}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select currency">
                {selectedCurrency} - {currencies.find(c => c.symbol === selectedCurrency)?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.symbol} value={curr.symbol}>
                  {curr.symbol} - {curr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 