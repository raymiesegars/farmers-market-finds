"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default async function vendorApprove(vendorId: number) {
  const { userId } = auth();
  const updatedVendor = await prisma.vendorProfile.update({
    where: {
      id: vendorId,
    },
    data: {
      approved: true,
    },
  });
  redirect('/vendors');
}
