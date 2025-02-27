"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Play } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(`Execution failed: ${data.error}`, {
          id: "flow-execution",
        });
      }
      toast.success("Execution started", { id: "flow-execution" });
      router.push(`/workflow/runs/${workflowId}/${data.executionId}`);
    },
    onError: () => {
      toast.error("Something went wrong", { id: "flow-execution" });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          // client side validation
          return;
        }

        mutation.mutate({
          workflowId: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <Play size={116} className="stroke-orange-400" /> Execute
    </Button>
  );
};

export default ExecuteBtn;
