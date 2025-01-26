"use client";

import React from "react";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task.types";
import NodeComponent from "./node/NodeComponent";

type Props = {
  workflow: Workflow;
};

const nodeTypes = {
  WebextractNode: NodeComponent,
};

// react-flow canvas adjustments
const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2 };

const FlowEditor = ({ workflow }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
      >
        <Background />
        <Controls position="bottom-left" fitViewOptions={fitViewOptions} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
