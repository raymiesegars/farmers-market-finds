// getUser.ts

import prisma from '@/lib/prisma';

export default async function getUser(
  id: string | null
): Promise<{
  id: string;
  name: string;
  email: string;
  deleted: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
} | null> {
  if (id === null) {
    return null;
  }

  return await prisma.user.findFirst({
    where: { id },
  });
}
