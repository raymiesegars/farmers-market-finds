'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Form from '@/components/Form';

export default async function VendorForm() {
  await setTimeout(() => {
  }, 1500)

  const { userId }: { userId: string | null } = auth();

  if (userId === null) {
    return (
      <h1>Creating your user in the database takes a few seconds, please refresh the page and try again.</h1>
    )
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { vendor_profile: true }
  })
  if (!user) {
    return(
      <h1>Creating your user in the database takes a few seconds, please refresh the page and try again.</h1>
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