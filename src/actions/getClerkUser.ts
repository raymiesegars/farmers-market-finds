"use server";

import { clerkClient } from "@clerk/nextjs";

export default async function getClerkUser(id: string) {
  try {
    const response = await clerkClient.users.getUser(id);
    console.log(response);
    return response.imageUrl;
  } catch (error) {
    return "";
  }
}
