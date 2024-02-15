import prisma from '@/lib/prisma';

export async function GET() {
  const globalGoods = await prisma.globalGoods.findMany()

  return Response.json(globalGoods)
}
