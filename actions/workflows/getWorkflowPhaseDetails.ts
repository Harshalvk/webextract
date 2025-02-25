"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId: user.id,
      },
    },
  });
}
