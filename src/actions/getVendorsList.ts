"use server";

import prisma from "@/lib/prisma";

export default async function getVendorsList() {
  return await prisma.vendorProfile.findMany({
    where: { approved: true },
  });
}
