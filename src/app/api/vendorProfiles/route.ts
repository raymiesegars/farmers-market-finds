import prisma from "@/lib/prisma";

export async function GET() {
  const vendorProfiles = await prisma.vendorProfile.findMany({
    where: {
      approved: true,
    },
  });

  return Response.json(vendorProfiles);
}
