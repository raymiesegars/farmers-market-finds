'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Form from '@/components/Form';

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
  if (!user) {
    return(
      <h1>Error</h1>
    )
  }
  
  if (user?.vendor_profile) {
    redirect("/vendor-dashboard")
  } else {
    return (
      <Form />
    )
  }
}