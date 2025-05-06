"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function SetupUser() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user?.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  const balance = await prisma.userBalance.findUnique({
    where: { userId: user.id },
  });

  if (!balance) {
    // free 100 credits
    await prisma.userBalance.create({
      data: {
        userId: user.id,
        credits: 100,
      },
    });
  }

  redirect("/dashboard");
}
