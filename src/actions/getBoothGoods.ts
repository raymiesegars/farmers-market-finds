"use server";

import prisma from "@/lib/prisma";

export default async function getBoothGoods(weeklyBoothId: number) {
  return await prisma.good.findMany({
    where: {
      weekly_booths_id: weeklyBoothId,
    },
    include: {
      global_good: true,
    },
  });
}
