import { TaskType } from "@/types/task.types";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
) {
  return {
    //these are properties which are required for react-flow
    id: crypto.randomUUID(),
    type: "WebextractNode",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
