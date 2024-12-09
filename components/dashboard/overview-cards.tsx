import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const cards = [
  {
    label: "Total Balance",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    color: "bg-blue-500",
    textColor: "text-blue-500",
    trend: "positive"
  },
  {
    label: "Income",
    value: "$5,231.89",
    description: "+19% from last month",
    icon: ArrowUpCircle,
    color: "bg-green-500",
    textColor: "text-green-500",
    trend: "positive"
  },
  {
    label: "Expenses",
    value: "$3,542.89",
    description: "+7% from last month",
    icon: ArrowDownCircle,
    color: "bg-red-500",
    textColor: "text-red-500",
    trend: "negative"
  },
  {
    label: "Recent Transactions",
    value: "+573",
    description: "+201 since last hour",
    icon: CreditCard,
    color: "bg-purple-500",
    textColor: "text-purple-500",
    trend: "positive"
  }
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.label}
            </CardTitle>
            <div className={cn(
              "rounded-full p-2",
              card.color + "/10",
            )}>
              <card.icon className={cn("h-4 w-4", card.textColor)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className={cn(
              "text-xs",
              card.trend === "positive" ? "text-green-500" : "text-red-500"
            )}>
              {card.description}
            </p>
            {/* Decorative gradient */}
            <div className={cn(
              "absolute bottom-0 left-0 h-1 w-full",
              card.color + "/20"
            )} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 