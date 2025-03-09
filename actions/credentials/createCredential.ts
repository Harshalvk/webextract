"use server";

import { auth } from "@/auth";
import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential.schema";
import { revalidatePath } from "next/cache";

export async function CreateCredential(form: createCredentialSchemaType) {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!user?.id) {
    throw new Error("Invalid user ID. Please log in again.");
  }

  //encrypt credential value
  const encryptValue = symmetricEncrypt(data.value);

  const result = await prisma.credential.create({
    data: {
      userId: user.id,
      name: data.name,
      value: encryptValue,
    },
  });

  if (!result) {
    throw new Error("falied to create credential");
  }

  revalidatePath("/credentials");
}
