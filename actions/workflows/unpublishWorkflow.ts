"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow.types";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow(id: string) {
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

  if (!workflow) {
    throw new Error("workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("workflow is not published");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
