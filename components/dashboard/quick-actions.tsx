import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, History } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="border-t-4 border-t-purple-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full justify-start bg-green-500 hover:bg-green-600" asChild>
          <Link href="/dashboard/transactions/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Transaction
          </Link>
        </Button>
        <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600" asChild>
          <Link href="/dashboard/reports">
            <FileText className="mr-2 h-4 w-4" />
            View Reports
          </Link>
        </Button>
        <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600" asChild>
          <Link href="/dashboard/transactions">
            <History className="mr-2 h-4 w-4" />
            Transaction History
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
} 