'use server';

import H1 from '@/components/ui/h1';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function VendorForm() {
  const { userId }: { userId: string | null } = auth();

  if (userId === null) {
    return (
      <h1>Error</h1>
    )
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { vendor_profile: true }
  })

  if (user?.vendor_profile) {
    redirect("/dashboard")
  } else {
    return (
      <H1>This is the form</H1>
      // <VendorForm />
    )
  }
}