"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function setRoleSuperAdmin(user_id: string) {
  await prisma.user.update({
    where: { id: user_id },
    data: { is_super_admin: true, is_admin: false },
  });
  revalidatePath("/");
  revalidateTag("/");
}
