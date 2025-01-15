"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetWorkflowsForUser() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  return prisma.workflow.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
