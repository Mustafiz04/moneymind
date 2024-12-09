"use client"

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { useUserSync } from '@/hooks/use-user-sync'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  useUserSync()
  return children
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <RootLayoutContent>
                {children}
              </RootLayoutContent>
            </ThemeProvider>
          </QueryClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
