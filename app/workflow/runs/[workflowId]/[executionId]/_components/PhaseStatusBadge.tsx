import { ExecutionPhaseStatus } from "@/types/workflow.types";
import { CircleCheck, CircleDashed, CircleX, Info, Loader } from "lucide-react";
import React from "react";

export default function PhaseStatusBadge({
  status,
}: {
  status: ExecutionPhaseStatus;
}) {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashed size={20} className="stroke-muted-foreground" />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader size={20} className="animate-spin stroke-yellow-500" />;
    case ExecutionPhaseStatus.FAILED:
      return <CircleX size={20} className="stroke-destructive" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheck size={20} className="stroke-green-500" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
}
