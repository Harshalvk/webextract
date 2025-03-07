"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Download, Upload } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { UnpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";

type Props = {
  workflowId: string;
};

const UnpublishBtn = ({ workflowId }: Props) => {

  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing workflow...", { id: workflowId });
        mutation.mutate(workflowId);
      }}
    >
      <Download size={116} className="stroke-orange-400" /> Unpublish
    </Button>
  );
};

export default UnpublishBtn;
