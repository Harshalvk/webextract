import { auth } from "@/auth";
import { waitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/prisma";
import React from "react";
import Editor from "../../_components/Editor";

type Props = {
  params: {
    workflowId: string;
  };
};

const page = async ({ params }: Props) => {
  const { workflowId } = await params;

  const session = await auth();
  const user = session?.user;
  if (!user?.id) return <div>Unauthenticated</div>;

  await waitFor(5000);

  const workflow = await prisma.workflow.findFirst({
    where: {
      id: workflowId,
      userId: user.id,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
};

export default page;
