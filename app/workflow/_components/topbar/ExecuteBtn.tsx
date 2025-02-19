"use client";

import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import React from "react";

type Props = {
  workflowId: string;
};

const ExecuteBtn = ({ workflowId }: Props) => {
  const generate = useExecutionPlan();

  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
      }}
    >
      <Play size={116} className="stroke-orange-400" /> Execute
    </Button>
  );
};

export default ExecuteBtn;
