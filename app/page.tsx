import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Money Mind 💰</h1>
        <p className="text-xl text-center">
          Track your expenses, manage your finances, and reach your financial goals
        </p>
        
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <Button variant="default">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline">Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        </SignedIn>
      </div>
    </main>
  )
}
