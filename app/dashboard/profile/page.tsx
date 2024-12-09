"use client"

import { UserProfile } from "@clerk/nextjs"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="container max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <ProfileHeader />
        {/* <ProfileStats /> */}

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            {/* <TabsTrigger value="activity">Activity</TabsTrigger> */}
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="activity">
            <ProfileActivity />
          </TabsContent> */}

          <TabsContent value="settings">
            <Card className="p-6">
              <UserProfile 
                appearance={{
                  elements: {
                    rootBox: "mx-auto max-w-3xl",
                    card: "shadow-none p-0 border-0",
                    navbar: "hidden",
                    pageScrollBox: "p-0"
                  }
                }}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 