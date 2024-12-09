"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, History, Coins, Tags } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="border-t-4 border-t-purple-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/transactions/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/settings?tab=categories">
            <Tags className="mr-2 h-4 w-4" />
            Manage Categories
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/settings">
            <Coins className="mr-2 h-4 w-4" />
            Change Currency
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/reports">
            <FileText className="mr-2 h-4 w-4" />
            View Reports
          </Link>
        </Button>
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/transactions">
            <History className="mr-2 h-4 w-4" />
            Transaction History
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
} 