import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { date } = req.query;
      
      const booth = await prisma.weeklyBooth.findFirst({
        where: {
          market: {
            date: new Date(date as string),
          },
        },
      });

      if (booth) {
        res.status(200).json({ weeklyBoothId: booth.id });
      } else {
        res.status(404).json({ message: 'Weekly booth not found for the given date.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the weekly booth ID.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
