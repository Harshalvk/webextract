import { HandleCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed":
        HandleCheckoutSessionCompleted(event.data.object);
        break;
      default:
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("stripe webhook error", error);
    return new NextResponse("stripe webhook error", { status: 400 });
  }
}
