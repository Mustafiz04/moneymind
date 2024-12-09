"use client"

import { ThemeToggle } from "@/components/settings/theme-toggle"
import { CurrencySettings } from "@/components/settings/currency-settings"
import { CategorySettings } from "@/components/settings/category-settings"
import { ReportSettings } from "@/components/settings/report-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
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
        </Tabs>
      </div>
    </div>
  )
} 