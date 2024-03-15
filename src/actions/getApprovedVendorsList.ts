"use server";

import prisma from "@/lib/prisma";

export default async function getApprovedVendorsList() {
  return await prisma.vendorProfile.findMany({
    where: { approved: true },
  });
}
