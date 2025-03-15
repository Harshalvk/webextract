"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetUserPurchaseHistory() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  const userId = user.id;

  if (!userId) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  return prisma.userPurchase.findMany({
    where: { userId },
    orderBy: {
      date: "desc",
    },
  });
}
