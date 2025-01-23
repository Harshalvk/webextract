"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeleteWorkflows = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user?.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/workflows")
};
