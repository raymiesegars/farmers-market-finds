import { currentUser } from "@clerk/nextjs";
import prisma from '@/lib/prisma';

export async function GET() {
  const user = await currentUser()

  if (!user) {
    console.log("Error no users")
    return Response.json(false);
  }

  const currentVendor = await prisma.vendorProfile.findFirst({
    where: {
      user_id: user.id
    }
  })

  if (!currentVendor) {
    return Response.json(false);
  } else {
    return Response.json(true);
  }
}
