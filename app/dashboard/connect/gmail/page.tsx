"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Shield, CheckCircle, AlertCircle, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
}

export default function GmailConnectionPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const steps: Step[] = [
    {
      id: 0,
      title: "Welcome to Gmail Integration",
      description: "Let's connect your Gmail account to detect bank transactions",
      icon: <Mail className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <p>This integration will help you:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Automatically detect transactions from bank emails</li>
            <li>Keep your transaction history up to date</li>
            <li>Save time on manual entry</li>
          </ul>
        </div>
      )
    },
    {
      id: 1,
      title: "Review Permissions",
      description: "Understand what access we need and why",
      icon: <Shield className="h-6 w-6" />,
      content: (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Required Permissions</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>Read emails from bank domains only</li>
              <li>Detect transaction details automatically</li>
              <li>Never modify or delete your emails</li>
              <li>Never read personal emails</li>
            </ul>
          </AlertDescription>
        </Alert>
      )
    },
    {
      id: 2,
      title: "Connect Gmail",
      description: "Grant access to your Gmail account",
      icon: <Mail className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <p>Click connect to proceed with Gmail authorization</p>
          <p className="text-sm text-muted-foreground">
            You'll be redirected to Google's secure login page
          </p>
        </div>
      )
    }
  ]

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/gmail')
      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No authorization URL received')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Gmail",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="container max-w-2xl mx-auto space-y-8">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Connections
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              {currentStepData.icon}
            </div>
            <div>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {currentStepData.content}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button 
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Connect Gmail
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="flex justify-center gap-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentStep >= step.id ? 'bg-primary' : 'bg-primary/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 