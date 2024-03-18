"use server";

import prisma from "@/lib/prisma";

export default async function getAllUsers() {
  return await prisma.user.findMany();
}
