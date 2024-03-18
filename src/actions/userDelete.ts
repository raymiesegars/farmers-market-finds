"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function userDelete(user_id: string) {
  await prisma.user.delete({
    where: {
      id: user_id,
    },
  });
  revalidatePath("/");
  revalidateTag("/");
}
