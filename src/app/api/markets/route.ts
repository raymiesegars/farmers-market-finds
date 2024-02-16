import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs'

export async function GET() {
  const user = await currentUser()

  if (!user) {
    console.log("Error no users")
    return Response.json([]);
  }

  const currentVendor = await prisma.vendorProfile.findFirst({
    where: {
      user_id: user.id
    }
  })

  let markets = await prisma.market.findMany({
    where: {
      date: {
        gt: new Date(),
      },
    },
    orderBy: {
      date: 'asc'
    },
  });

  if (!markets) {
    console.log("Error no markets")
    return Response.json([]);
  }

  if(!currentVendor) {
    console.log("Error no vendors")
    return Response.json([]);
  }

  for (let market in markets) {
    const hasBooth = await prisma.weeklyBooth.findFirst({
      where: {
        market_id: markets[market].id,
        vendor_id: currentVendor.id,
      },
    });
    //@ts-ignore
    markets[market] = { ...markets[market], hasBooth };
  }

  return Response.json(markets);
}
