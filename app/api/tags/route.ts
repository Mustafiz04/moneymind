import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('user_id', userId)
      .order('name')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[TAGS_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    const { data, error } = await supabase
      .from('tags')
      .insert({
        name,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[TAGS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 