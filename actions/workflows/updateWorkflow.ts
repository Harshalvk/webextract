"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow.types";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!workflow) throw new Error("Workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not a drat");
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/workflow")
}
