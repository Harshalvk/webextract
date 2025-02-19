import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { IAppNode } from "@/types/appNode.types";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExecutionPlan(nodes as IAppNode[], edges);
    return executionPlan;
  }, [toObject]);
  return generateExecutionPlan;
};

export default useExecutionPlan;
