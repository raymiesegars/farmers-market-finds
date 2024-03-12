import prisma from "@/lib/prisma";

export async function GET() {
  const vendorProfiles = await prisma.vendorProfile.findMany({
    where: {
      approved: false,
    },
  });

  return Response.json(vendorProfiles);
}
