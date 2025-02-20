"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow.types";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  const workflow = await prisma.workflow.findFirst({
    where: {
      userId: user.id,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error("flow definition is not defined");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition not valids");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  executionPlan = result.executionPlan;

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId: user.id,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId: user.id!,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("workflow execution not created");
  }
}
