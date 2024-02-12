'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { error } from 'console';

interface vendorFormSubmissionProps {
  data: {
    vendor_name?: string;
    vendor_description?: string;
  };
}

export default async function vendorFormSubmission(formData: FormData) {
  const { userId } = auth();
  console.log({userId})
  await prisma.vendorProfile.create({
    data: {
      user_id: userId as string,
      vendor_name: formData.get('vendor_name') as string,
      vendor_description: formData.get('vendor_description') as string,
      vendor_image_path: '',
    },
  });
}
