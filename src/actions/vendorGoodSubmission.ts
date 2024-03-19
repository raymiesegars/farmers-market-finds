"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";

interface VendorGoodSubmissionProps {
  globalGoodId: number;
  price: number;
  description: string;
}

export default async function vendorGoodSubmission(formData: FormData) {
  try {
    const { userId } = auth();
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const globalGoodId = parseInt(formData.get("globalGoodId") as string);
    const weeklyBoothId = parseInt(formData.get("weeklyBoothId") as string);
    await prisma.good.create({
      data: {
        description,
        price,
        global_good: {
          connect: {
            id: globalGoodId,
          },
        },
        weekly_booths: {
          connect: {
            id: weeklyBoothId,
          },
        },
      },
    });
    revalidatePath("/");
    revalidateTag("/");
  } catch (error) {
    console.error("Failed to submit good:", error);
    throw new Error("An error occurred while submitting the good.");
  }
}
