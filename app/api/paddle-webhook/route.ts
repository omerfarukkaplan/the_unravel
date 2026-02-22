
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  if (body.event_type === "transaction.completed") {
    const userId = body.data.custom_data.user_id

    await supabase.rpc("add_coins", {
      uid: userId,
      amount: 1000
    })

    await supabase.from("purchases").insert({
      user_id: userId,
      product_id: "pri_01kj10pm3304a70q4t0hs1f0r0",
      amount: 1000,
      revenue_usd: 5
    })
  }

  return NextResponse.json({ ok: true })
}
