"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function vendorApprove(vendorId: number) {
  const { userId } = auth();
  await prisma.vendorProfile.update({
    where: {
      id: vendorId,
    },
    data: {
      approved: true,
    },
  });
  revalidatePath('/');
}
