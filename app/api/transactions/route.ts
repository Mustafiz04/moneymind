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
      .from('transactions')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('[TRANSACTIONS_GET]', error)
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
    const { type, amount, date, notes, category_id, tags } = body

    const tagsArray = tags ? 
      tags.split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0) 
      : []

    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        type,
        amount,
        date,
        notes,
        category_id,
        user_id: userId,
        tags: tagsArray
      })
      .select(`
        *,
        category:categories(*)
      `)
      .single()

    if (transactionError) throw transactionError

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('[TRANSACTIONS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 