"use client";

import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import React from "react";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath] = getSmoothStepPath(props);
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
    </>
  );
};

export default DeletableEdge;
