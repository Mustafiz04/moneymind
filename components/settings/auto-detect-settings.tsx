"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AutoDetectSettings() {
  const [isEmailEnabled, setIsEmailEnabled] = useState(false)
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Detect Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Gmail Integration</h3>
            <p className="text-sm text-muted-foreground">
              Automatically detect transactions from your email
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={isEmailEnabled}
              onCheckedChange={setIsEmailEnabled}
            />
            <Button 
              variant="outline" 
              onClick={handleGmailConnect}
              disabled={!isEmailEnabled}
            >
              <Mail className="mr-2 h-4 w-4" />
              Connect Gmail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 