"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task.types";
import { Coins, GripVertical } from "lucide-react";
import React from "react";

type Props = {
  taskType: TaskType;
};

const NodeHeader = ({ taskType }: Props) => {
  const task = TaskRegistry[taskType];
  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <div className="flex items-center gap-2">
        <task.icon size={16} />
        <span className="font-semibold uppercase text-muted-foreground text-md">
          {task.label}
        </span>
      </div>
      <div className="flex gap-1 items-center">
        {task.isEntryPoint && <Badge className="text-xs">Entry Point</Badge>}
        <Badge className="gap-2 flex items-center text-xs">
          <Coins size={16} />
          TODO
        </Badge>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="drag-handle cursor-grab"
        >
          <GripVertical size={20}/>
        </Button>
      </div>
    </div>
  );
};

export default NodeHeader;
