"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function vendorApprove(vendorId: number) {
  const { userId } = auth();
  await prisma.vendorProfile.delete({
    where: {
      id: vendorId,
    },
  });
  revalidatePath("/");
  revalidateTag("/");
}
