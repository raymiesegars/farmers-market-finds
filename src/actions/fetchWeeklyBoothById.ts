// actions/fetchWeeklyBoothById.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchWeeklyBoothById(id: number) {
  return await prisma.weeklyBooth.findUnique({
    where: { id },
    include: {
      vendor: true,
      booth_goods: {
        include: {
          global_good: true,
        },
      },
      market: true,
    },
  });
}
