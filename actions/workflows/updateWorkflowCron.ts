"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import parser from "cron-parser";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  try {
    const interval = parser.parse(cron);
    await prisma.workflow.update({
      where: { id, userId: user.id },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.error("invalid cron:", error.message);
    throw new Error("invalid cron expression");
  }

  revalidatePath("/workflows");
}
