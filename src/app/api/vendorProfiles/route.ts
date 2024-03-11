import prisma from '@/lib/prisma';

export async function GET() {
  const vendorProfiles = await prisma.vendorProfile.findMany()

  return Response.json(vendorProfiles)
}
