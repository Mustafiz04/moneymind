"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Smartphone, CreditCard, Wallet } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: 'gmail',
    name: 'Gmail Integration',
    description: 'Automatically detect transactions from your bank emails',
    icon: Mail,
    href: '/dashboard/connect/gmail',
    comingSoon: false
  },
  {
    id: 'sms',
    name: 'SMS Integration',
    description: 'Connect your phone to detect bank SMS notifications',
    icon: Smartphone,
    href: '/dashboard/connect/gmail',
    comingSoon: true
  },
  {
    id: 'cards',
    name: 'Bank Cards',
    description: 'Direct integration with your credit and debit cards',
    icon: CreditCard,
    href: '/dashboard/connect/gmail',
    comingSoon: true
  },
  {
    id: 'upi',
    name: 'UPI Payments',
    description: 'Track all your UPI transactions automatically',
    icon: Wallet,
    href: '/dashboard/connect/gmail',
    comingSoon: true
  }
]

export default function ConnectionsPage() {
  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Connected Services</h1>
        <p className="text-muted-foreground">
          Connect your accounts to automatically track transactions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {service.name}
                    {service.comingSoon && (
                      <span className="text-xs bg-yellow-200/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {service.comingSoon ? (
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link href={service.href}>Connect</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 