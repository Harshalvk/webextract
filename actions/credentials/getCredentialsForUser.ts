"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GetCredentialsForUser() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  return prisma.credential.findMany({
    where: { userId: user.id },
    orderBy: {
      name: "asc",
    },
  });
}
