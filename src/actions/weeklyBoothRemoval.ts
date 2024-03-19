"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function weeklyBoothRemoval(formData: FormData) {
  const session = await auth();
  const userId = session.userId;

  const marketIdValue = formData.get("marketId");
  if (!userId) {
    return { success: false, message: "User not authenticated." };
  }

  const marketId = parseInt(marketIdValue as string, 10);

  if (isNaN(marketId) || !marketId) {
    return { success: false, message: "Invalid market ID." };
  }

  const vendorProfile = await prisma.vendorProfile.findUnique({
    where: { user_id: userId },
  });

  if (!vendorProfile) {
    return { success: false, message: "Vendor profile not found." };
  }

  const boothRemoval = await prisma.weeklyBooth.deleteMany({
    where: {
      market_id: marketId,
      vendor_id: vendorProfile.id,
    },
  });

  if (boothRemoval.count > 0) {
    // Revalidate cache if a booth was removed
    await revalidatePath("/");
    await revalidateTag("/");
    return { success: true, message: "Booth removed successfully." };
  } else {
    return { success: false, message: "No booth found to remove." };
  }
}
