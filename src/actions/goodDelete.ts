"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function goodDelete(good_id: number) {
  await prisma.good.delete({
    where: {
      id: good_id,
    },
  });
  revalidatePath("/");
  revalidateTag("/");
}
