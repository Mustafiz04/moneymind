"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrencySettings } from "@/components/settings/currency-settings"
import { CategorySettings } from "@/components/settings/category-settings"
import { ConnectionsSettings } from "@/components/settings/connections-settings"
import { useSearchParams } from "next/navigation"
import { ReportSettings } from "@/components/settings/report-settings"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/settings/theme-toggle"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'currency'

  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and account settings
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <TabsContent value="currency">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Theme</h2>
            <ThemeToggle />
          </Card>
          <CurrencySettings />
        </TabsContent>
        <TabsContent value="categories">
          <CategorySettings />
        </TabsContent>
        <TabsContent value="reports">
            <ReportSettings />
        </TabsContent>
        <TabsContent value="connections">
          <ConnectionsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
} 