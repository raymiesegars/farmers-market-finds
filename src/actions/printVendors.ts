import prisma from "@/lib/prisma";

export default async function PrintVendors() {
  const vendors = await prisma.vendorProfile.findMany({
    where: {
      approved: true
    }
  });
  return vendors
}