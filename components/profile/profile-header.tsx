"use client"

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileHeader() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <ProfileHeaderSkeleton />
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user?.fullName}</h2>
          <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileHeaderSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </CardContent>
    </Card>
  )
} 