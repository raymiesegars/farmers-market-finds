"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function setRoleAdmin(user_id: string) {
  await prisma.user.update({
    where: { id: user_id },
    data: { is_super_admin: false, is_admin: true },
  });
  revalidatePath("/");
  revalidateTag("/");
}
