// import type { IncomingHttpHeaders } from "http";
// import type { NextApiRequest, NextApiResponse } from "next";
// import type { WebhookRequiredHeaders } from "svix";
// import type { User } from "@clerk/nextjs/api";
// import { Webhook } from "svix";
// import prisma from "@/lib/prisma";

// type UnwantedKeys = "emailAddresses" | "firstName" | "lastName" | "primaryEmailAddressId" | "primaryPhoneNumberId" | "phoneNumbers";

// interface UserInterface extends Omit<User , UnwantedKeys>{
//     email_addresses: {
//       email_address: string;
//       id: string;
//     }[];
//     primary_email_address_id: string;
//     first_name: string;
//     last_name: string;
//     primary_phone_number_id: string;
//     phone_numbers: {
//         phone_number: string;
//         id: string;
//     }[];
//   }

//   const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

//   export async function POST(
//     req: NextApiRequestWithSvixRequiredHeaders,
//     res: NextApiResponse
//   ) {
//     const payload = JSON.stringify(req.body);
//     const headers = req.headers;
//     const wh = new Webhook(webhookSecret);
//     let evt: Event | null = null;
//     try {
//       evt = wh.verify(payload, headers) as Event;
//     } catch (_) {
//       return res.status(400).json({});
//     }
//     const { id } = evt.data;
//     // Handle the webhook
//     const eventType: EventType = evt.type;
//     if (eventType === "user.created" || eventType === "user.updated") {
//         const { email_addresses,primary_email_address_id,first_name,last_name} = evt.data;
//         const emailObject = email_addresses?.find((email) => {
//           return email.id === primary_email_address_id;
//         });
//         if (!emailObject) {
//           return res.status(400).json({});
//         }
//         await prisma.user.upsert({
//           where: { id: id },
//           update: {
//             name: `${first_name || ""} ${last_name || ""}`,
//             email: emailObject.email_address,
//           },
//           create: {
//             id: id,
//             name: `${first_name || ""} ${last_name || ""}`,
//             email: emailObject.email_address,
//           },
//         });
//       }
//       console.log(`User ${id} was ${eventType}`);
//       res.status(201).json({});
//     }

//   type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
//     headers: IncomingHttpHeaders & WebhookRequiredHeaders;
//   };

//   type Event = {
//     data: UserInterface ;
//     object: "event";
//     type: EventType;
//   };

//   type EventType = "user.created" | "user.updated" | "*";

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { email_addresses, primary_email_address_id, first_name, last_name } =
      evt.data;
    const emailObject = email_addresses?.find((email) => {
      return email.id === primary_email_address_id;
    });
    if (!emailObject) {
      return new Response('Good', {
        status: 200,
      });
    }
    await prisma.user.upsert({
      where: { id: id },
      update: {
        name: `${first_name || ''} ${last_name || ''}`,
        email: emailObject.email_address,
      },
      create: {
        id: id,
        name: `${first_name || ''} ${last_name || ''}`,
        email: emailObject.email_address,
      },
    });
  }

  return new Response('', { status: 200 });
}


