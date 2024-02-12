import prisma from "@/lib/prisma"

//route handler for receiving new user creation at the endpoint from Clerk

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {

  try {
    await prisma.user.create({
      data: {
        //@ts-ignore
        name: request.body.data.username,
        //@ts-ignore
        email: request.body.data.email_addresses[0].email_address,
      }
    })
    return new Response('Success!', {
      status: 200,
    })
    
  } catch (error) {
    return new Response('Failed!', {
      status: 400,
    })
  }
}