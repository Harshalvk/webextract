"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow started", { id: workflowId });
      router.push(`/workflow/runs/${workflowId}/${data.executionId}`);
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <Play size={16} />
      Run
    </Button>
  );
}
