
import { Paddle } from "@paddle/paddle-js"

let paddle: Paddle | null = null

export async function initPaddle() {
  paddle = await Paddle.Initialize({
    environment: "production",
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
  })
}

export function buyCoins(userId: string) {
  paddle?.Checkout.open({
    items: [{ 
      priceId: "pri_01kj10pm3304a70q4t0hs1f0r0", 
      quantity: 1 
    }],
    customData: { user_id: userId }
  })
}
