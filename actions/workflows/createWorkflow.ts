"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflow.schema";
import { WorkflowStatus } from "@/types/workflow.types";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user?.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  const result = await prisma.workflow.create({
    data: {
      userId: user.id,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${result.id}`);
}
