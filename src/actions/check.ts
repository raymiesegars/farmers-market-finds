import prisma from "@/lib/prisma";

export default async function Check() {
  await prisma.user.create({
    data: {
      name: "Eric",
      email: "eric@gmail.com"
    }
  })
}