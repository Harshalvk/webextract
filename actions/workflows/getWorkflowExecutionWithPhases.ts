"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  return prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId: user.id,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
