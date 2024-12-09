import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { format } from "date-fns"

const activities = [
  {
    type: "expense",
    amount: 85.50,
    category: "Food",
    description: "Weekly grocery shopping",
    date: new Date("2024-03-15")
  },
  {
    type: "income",
    amount: 3200.00,
    category: "Salary",
    description: "Monthly salary",
    date: new Date("2024-03-01")
  },
  // Add more activities...
]

export function ProfileActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${
                  activity.type === "income" 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-red-500/10 text-red-500"
                }`}>
                  {activity.type === "income" ? (
                    <ArrowUpCircle className="h-4 w-4" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    activity.type === "income" 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {activity.type === "income" ? "+" : "-"}
                    ${activity.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(activity.date, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 