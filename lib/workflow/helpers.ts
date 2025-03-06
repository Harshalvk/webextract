import { IAppNode } from "@/types/appNode.types";
import { TaskRegistry } from "./task/registry";

export function CalculateWorkflowCost(nodes: IAppNode[]) {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
}
