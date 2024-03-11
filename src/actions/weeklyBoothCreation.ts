"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export default async function weeklyBoothCreation(formData: FormData) {
  const session = await auth();
  const userId = session.userId;

  const marketIdValue = formData.get("marketId");
  if (!userId) {
    return false;
  }

  const marketId = parseInt(marketIdValue as string, 10);

  if (isNaN(marketId)) {
    return false;
  }

  if (!marketId) {
    return false;
  }

  const vendorProfile = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (!vendorProfile) {
    return false;
  }

  const weeklyBooth = await prisma.weeklyBooth.create({
    data: {
      market_id: marketId,
      vendor_id: vendorProfile.id,
    },
  });

  return true;
}
