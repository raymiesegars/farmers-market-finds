import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const vendorProfiles = await prisma.vendorProfile.findMany({
    where: {
      approved: true,
    },
  });

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json(vendorProfiles);
}
