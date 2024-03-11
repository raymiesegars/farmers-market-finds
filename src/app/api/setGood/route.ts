import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { globalGoodId, price, description, weeklyBoothId } = req.body;

    try {
      const good = await prisma.good.create({
        data: {
          description,
          price,
          global_good_id: globalGoodId,
          weekly_booths_id: weeklyBoothId,
        },
      });

      res.status(200).json(good);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add good to booth', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
