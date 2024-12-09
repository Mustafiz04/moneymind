import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react"

const stats = [
  {
    title: "Total Transactions",
    value: "2,345",
    description: "All time transactions",
    icon: Receipt,
    color: "text-blue-500"
  },
  {
    title: "Total Income",
    value: "$23,456",
    description: "+20.1% from last month",
    icon: ArrowUpCircle,
    color: "text-green-500"
  },
  {
    title: "Total Expenses",
    value: "$12,345",
    description: "+4.5% from last month",
    icon: ArrowDownCircle,
    color: "text-red-500"
  },
  {
    title: "Current Balance",
    value: "$11,111",
    description: "As of today",
    icon: Wallet,
    color: "text-purple-500"
  }
]

export function ProfileStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 