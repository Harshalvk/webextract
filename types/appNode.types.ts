import { Node } from "@xyflow/react";
import { TaskType } from "./task.types";

export interface IAppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface IAppNode extends Node {
  data: IAppNodeData
}
