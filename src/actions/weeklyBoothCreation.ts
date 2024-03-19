"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";

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
  revalidatePath("/");
  revalidateTag("/");
  return true;
}
