import { TaskType } from "@/types/task.types";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
) {
  return {
    //these are properties which are required for react-flow node config
    id: crypto.randomUUID(),
    type: "WebextractNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
