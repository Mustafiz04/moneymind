"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ConnectionStep = 'initial' | 'permissions' | 'connecting' | 'success' | 'error'

interface StepContent {
  title: string
  description: string
  icon: React.ReactNode
}

export function GmailConnectionFlow() {
  const [step, setStep] = useState<ConnectionStep>('initial')
  const [error, setError] = useState<string>('')
  const { toast } = useToast()

  const steps: Record<ConnectionStep, StepContent> = {
    initial: {
      title: "Connect Gmail",
      description: "Connect your Gmail account to automatically detect bank transactions from your emails.",
      icon: <Mail className="h-6 w-6" />
    },
    permissions: {
      title: "Grant Permissions",
      description: "We need permission to read your emails to detect bank transactions. We only process emails from bank domains.",
      icon: <Shield className="h-6 w-6" />
    },
    connecting: {
      title: "Connecting...",
      description: "Please wait while we set up your Gmail connection.",
      icon: <Loader2 className="h-6 w-6 animate-spin" />
    },
    success: {
      title: "Successfully Connected",
      description: "Your Gmail account is now connected. We'll start detecting transactions from your bank emails.",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    error: {
      title: "Connection Failed",
      description: "We encountered an error while connecting your Gmail account.",
      icon: <AlertCircle className="h-6 w-6 text-red-500" />
    }
  }

  const handleConnect = async () => {
    try {
      setStep('permissions')
      const response = await fetch('/api/auth/gmail')
      const { url } = await response.json()
      
      if (url) {
        setStep('connecting')
        window.location.href = url
      } else {
        throw new Error('No authorization URL received')
      }
    } catch (error) {
      setStep('error')
      setError('Failed to initiate Gmail connection')
      toast({
        title: "Error",
        description: "Failed to connect to Gmail",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10">
            {steps[step].icon}
          </div>
          <div>
            <CardTitle>{steps[step].title}</CardTitle>
            <CardDescription>{steps[step].description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {step === 'permissions' && (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Permissions Required</AlertTitle>
              <AlertDescription>
                We will:
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Read emails from bank domains only</li>
                  <li>Detect transaction details automatically</li>
                  <li>Never modify or delete your emails</li>
                  <li>Never read personal emails</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {step === 'initial' && (
          <Button 
            className="w-full"
            onClick={handleConnect}
          >
            Connect Gmail
          </Button>
        )}

        {step === 'permissions' && (
          <Button 
            className="w-full"
            onClick={handleConnect}
          >
            Continue with Gmail
          </Button>
        )}

        {step === 'error' && (
          <Button 
            className="w-full"
            variant="outline"
            onClick={() => setStep('initial')}
          >
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 