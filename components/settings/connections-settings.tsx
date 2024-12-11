"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Mail, Smartphone, CreditCard, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export function ConnectionsSettings() {
  const [enabledServices, setEnabledServices] = useState({
    email: false,
    sms: false,
    card: false,
    upi: false
  })
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
      name: 'Email Integration',
      description: 'Connect your Gmail to detect bank transaction emails',
      icon: Mail,
      action: handleGmailConnect,
      comingSoon: false
    },
    {
      id: 'sms',
      name: 'SMS Integration',
      description: 'Automatically detect transactions from bank SMS',
      icon: Smartphone,
      comingSoon: true
    },
    {
      id: 'card',
      name: 'Card Integration',
      description: 'Connect your credit and debit cards',
      icon: CreditCard,
      comingSoon: true
    },
    {
      id: 'upi',
      name: 'UPI Integration',
      description: 'Track your UPI transactions automatically',
      icon: Wallet,
      comingSoon: true
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-muted">
                <service.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium flex items-center gap-2">
                  {service.name}
                  {service.comingSoon && (
                    <span className="text-xs bg-yellow-200/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={enabledServices[service.id as keyof typeof enabledServices]}
                onCheckedChange={(checked) => {
                  setEnabledServices(prev => ({
                    ...prev,
                    [service.id]: checked
                  }))
                }}
                disabled={service.comingSoon}
              />
              {service.action && (
                <Button
                  variant="outline"
                  onClick={service.action}
                  disabled={!enabledServices[service.id as keyof typeof enabledServices] || service.comingSoon}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 