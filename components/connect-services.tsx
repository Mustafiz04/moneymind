"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Smartphone, CreditCard, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ConnectServices() {
  const { toast } = useToast()

  const handleGmailConnect = async () => {
    try {
      const response = await fetch('/api/auth/gmail')
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Gmail",
        variant: "destructive"
      })
    }
  }

  const services = [
    {
      id: 'email',
      name: 'Gmail',
      description: 'Bank emails',
      icon: Mail,
      action: handleGmailConnect,
      comingSoon: false
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Bank messages',
      icon: Smartphone,
      comingSoon: true
    },
    {
      id: 'card',
      name: 'Cards',
      description: 'Bank cards',
      icon: CreditCard,
      comingSoon: true
    },
    {
      id: 'upi',
      name: 'UPI',
      description: 'UPI payments',
      icon: Wallet,
      comingSoon: true
    }
  ]

  return (
    <Card className="border-t-4 border-t-blue-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Connect Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {services.map((service) => (
            <Button
              key={service.id}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={service.action}
              disabled={service.comingSoon}
            >
              <service.icon className="h-5 w-5" />
              <div className="space-y-1 text-center">
                <h3 className="font-medium text-sm">{service.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {service.description}
                </p>
                {service.comingSoon && (
                  <span className="text-[10px] bg-yellow-200/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 