import prisma from "@/lib/prisma";

export default async function getUser(id: string | null) {
  if(id === null) {
    return false
  }
  
  return await prisma.user.findFirst({
    where: {id}
  })
}