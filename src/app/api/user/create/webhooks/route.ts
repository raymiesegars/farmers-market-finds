import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { User } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import prisma from "@/lib/prisma";


type UnwantedKeys = "emailAddresses" | "firstName" | "lastName" | "primaryEmailAddressId" | "primaryPhoneNumberId" | "phoneNumbers";

interface UserInterface extends Omit<User , UnwantedKeys>{
    email_addresses: {
      email_address: string;
      id: string;
    }[];
    primary_email_address_id: string;
    first_name: string;
    last_name: string;
    primary_phone_number_id: string;
    phone_numbers: {
        phone_number: string;
        id: string;
    }[];
  }
  
  const webhookSecret: string = process.env.WEBHOOK_SECRET || "";
  
  export async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse
  ) {
    const payload = JSON.stringify(req.body);
    const headers = req.headers;
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
      evt = wh.verify(payload, headers) as Event;
    } catch (_) {
      return res.status(400).json({});
    }
    const { id } = evt.data;
    // Handle the webhook
    const eventType: EventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
        const { email_addresses,primary_email_address_id,first_name,last_name} = evt.data;
        const emailObject = email_addresses?.find((email) => {
          return email.id === primary_email_address_id;
        });
        if (!emailObject) {
          return res.status(400).json({});
        }
        await prisma.user.upsert({
          where: { id: id },
          update: {
            name: `${first_name || ""} ${last_name || ""}`,
            email: emailObject.email_address,
          },
          create: {
            id: id,
            name: `${first_name || ""} ${last_name || ""}`,
            email: emailObject.email_address,
          },
        });
      }
      console.log(`User ${id} was ${eventType}`);
      res.status(201).json({});
    }
  
  type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
  };
  
  type Event = {
    data: UserInterface ;
    object: "event";
    type: EventType;
  };
  
  type EventType = "user.created" | "user.updated" | "*";
