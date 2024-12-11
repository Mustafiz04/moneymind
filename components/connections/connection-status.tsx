"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ConnectionStatus {
  isConnected: boolean
  lastSync?: string
  error?: string
}

export function ConnectionStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({ isConnected: false })
  const { toast } = useToast()

  useEffect(() => {
    checkConnectionStatus()
  }, [])

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch('/api/connections/status')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Error checking connection status:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await fetch('/api/connections/gmail/disconnect', { method: 'POST' })
      setStatus({ isConnected: false })
      toast({
        title: "Disconnected",
        description: "Gmail connection has been removed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect Gmail",
        variant: "destructive"
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Gmail Connection
        </CardTitle>
        <CardDescription>
          Status of your Gmail integration for transaction detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {status.isConnected ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <span className="font-medium">
              {status.isConnected ? 'Connected' : 'Not Connected'}
            </span>
          </div>
          
          {status.lastSync && (
            <p className="text-sm text-muted-foreground">
              Last synced: {new Date(status.lastSync).toLocaleString()}
            </p>
          )}

          {status.error && (
            <p className="text-sm text-red-500">
              Error: {status.error}
            </p>
          )}

          {status.isConnected && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDisconnect}
            >
              Disconnect Gmail
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 