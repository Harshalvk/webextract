"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from "@/schema/workflow.schema";
import { WorkflowStatus } from "@/types/workflow.types";
import { revalidatePath } from "next/cache";

export async function DuplicateWorkflow(form: duplicateWorkflowSchemaType) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form);

  if (!success || !data) {
    throw new Error("Invalid form data");
  }

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user?.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: { id: data.workflowId, userId: user.id },
  });

  if (!sourceWorkflow) throw new Error("workflow not found");

  const result = await prisma.workflow.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!result) throw new Error("failed to duplicate workflow");

  revalidatePath("/workflows");
}
