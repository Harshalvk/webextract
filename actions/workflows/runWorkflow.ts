"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkflowStatus,
} from "@/types/workflow.types";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  try {
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

    let workflowDefinition = flowDefinition;

    if (workflow.status === WorkflowStatus.PUBLISHED) {
      if (!workflow.executionPlan) {
        throw new Error("no execution plan found in published workflow");
      }
      executionPlan = JSON.parse(workflow.executionPlan);
      workflowDefinition = workflow.definition;
    } else {
      //workflow is a draft
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
    }

    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: user.id,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.MANUAL,
        definition: workflowDefinition,
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

    ExecuteWorkflow(execution.id); // long running process, let it run in background

    return { success: true, executionId: execution.id };
  } catch (error: any) {
    console.error("Runworkflow error:", error);
    return { error: error.message || "Unknown error occurred" };
  }
}
