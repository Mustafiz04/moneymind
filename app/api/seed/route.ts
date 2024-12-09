import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { seedDefaultData } from "@/scripts/seed-data"

export async function POST() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const success = await seedDefaultData(userId)

    if (!success) {
      return new NextResponse("Failed to seed data", { status: 500 })
    }

    return NextResponse.json({ message: "Successfully seeded data" })
  } catch (error) {
    console.error('[SEED_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 