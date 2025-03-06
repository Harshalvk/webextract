"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function GetWorkFlowExecutions(workflowId: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  return await prisma.workflowExecution.findMany({
    where: {
      workflowId  ,
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
  });
}
