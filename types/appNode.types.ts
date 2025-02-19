import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task.types";

export interface IAppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface IAppNode extends Node {
  data: IAppNodeData;
}

export type ParamProps = {
  param: TaskParam;
  value: string;
  udpateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
};

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
