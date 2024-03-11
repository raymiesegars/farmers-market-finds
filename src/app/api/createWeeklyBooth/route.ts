import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data =
  | { message: string; id?: number }
  | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    const { vendorId, marketId }: { vendorId: number; marketId: number } =
      req.body;

    try {
      const newBooth = await prisma.weeklyBooth.create({
        data: {
          vendor_id: vendorId,
          market_id: marketId,
        },
      });

      res
        .status(200)
        .json({ message: "Booth created successfully", id: newBooth.id });
    } catch (error: unknown) {
      console.error("Request error", error);
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Error creating weekly booth", message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
