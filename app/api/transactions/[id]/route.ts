import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { supabase } from "@/lib/supabase"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', params.id)
      .eq('user_id', userId)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TRANSACTION_DELETE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { type, amount, date, notes, category_id, tags } = body

    // Convert comma-separated tags to array and trim whitespace
    const tagsArray = tags ? 
      tags.split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0) 
      : []

    const { data, error } = await supabase
      .from('transactions')
      .update({
        type,
        amount,
        date,
        notes,
        category_id,
        tags: tagsArray
      })
      .eq('id', params.id)
      .eq('user_id', userId)
      .select(`
        *,
        category:categories(*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[TRANSACTION_UPDATE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', params.id)
      .eq('user_id', userId)
      .single()

    if (error) throw error
    if (!data) return new NextResponse("Not found", { status: 404 })

    return NextResponse.json(data)
  } catch (error) {
    console.error('[TRANSACTION_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 