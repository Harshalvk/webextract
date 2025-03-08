import { TaskParam, TaskParamType } from "@/types/task.types";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { IAppNode } from "@/types/appNode.types";
import BrowserInstanceParam from "./param/BrowserInstanceParam";
import SelectParam from "./param/SelectParam";

type Props = {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
};

const NodeParamField = ({ param, nodeId, disabled }: Props) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as IAppNode;
  const value = node?.data.inputs?.[param.name];

  const udpateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, nodeId, node?.data.inputs, param.name]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          udpateNodeParamValue={udpateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          udpateNodeParamValue={udpateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          udpateNodeParamValue={udpateNodeParamValue}
          disabled={disabled}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
