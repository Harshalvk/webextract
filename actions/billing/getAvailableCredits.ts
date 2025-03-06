"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetAvailableCredits() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  const balance = await prisma.userBalance.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!balance) return -1;
  return balance.credits;
}
