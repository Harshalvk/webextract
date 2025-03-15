"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";

export async function DownloadInvoice(id: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  const userId = user.id;

  if (!userId) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  const purchase = await prisma.userPurchase.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!purchase) {
    throw new Error("bad request");
  }

  const stripeInvoiceSession = await stripe.checkout.sessions.retrieve(
    purchase.stripeId
  );

  if (!stripeInvoiceSession) {
    throw new Error("invoice not found");
  }

  const invoice = await stripe.invoices.retrieve(
    stripeInvoiceSession.invoice as string
  );

  return invoice.hosted_invoice_url;
}
