"use server";

import prisma from "@/lib/prisma";

export default async function getUnapprovedVendorsList() {
  return await prisma.vendorProfile.findMany({
    where: { approved: false },
  });
}
