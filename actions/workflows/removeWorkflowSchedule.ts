"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function RemoveWorkflowSchedule(id: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath(`/workflows`);
}
