"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow.types";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
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

  if (!workflow) throw new Error("workflow not found");

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not draft");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("flow defintion not valid");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);

  await prisma.workflow.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
