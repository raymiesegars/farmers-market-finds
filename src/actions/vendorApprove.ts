"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

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
  redirect('/vendors');
}
