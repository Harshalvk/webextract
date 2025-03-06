import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow.types";
import React from "react";

const indicatroColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "bg-slate-400 animate-pulse",
  RUNNING: "bg-yellow-400 animate-pulse",
  FAILED: "bg-red-400",
  COMPLETED: "bg-emerald-600",
};

export default function ExecutionStatusIndicator({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return (
    <div className={cn("w-2 h-2 rounded-full", indicatroColors[status])} />
  );
}
