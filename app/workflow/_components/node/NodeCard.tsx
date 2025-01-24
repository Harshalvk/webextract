"use client"

import React from "react";

type Props = {
  nodeId: string;
  children: React.ReactNode;
};

const NodeCard = ({ nodeId, children }: Props) => {
  return <div>{children}</div>;
};

export default NodeCard;
