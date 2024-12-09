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
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
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
    const { name, type } = body

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name,
        type,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[CATEGORIES_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return new NextResponse("Category ID required", { status: 400 })
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[CATEGORIES_DELETE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 