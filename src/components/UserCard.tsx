"use client";

import getClerkUser from "@/actions/getClerkUser";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteUser } from "./DeleteUser";
import { RoleSelection } from "./RoleSelection";

interface UserCardProp {
  user: User;
}

export default function UserCard({ user }: UserCardProp) {
  const [image, setImage] = useState("");

  useEffect(() => {
    getClerkUser(user.id).then((res) => setImage(res));
  }, []);

  return (
    <div>
      <div className="block overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-auto">
            <Image
              src={image || "/assets/user-placeholder.png"}
              alt={`${name} image`}
              height={225}
              width={300}
              className="h-48 rounded-md border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
            />
          </div>
        </div>
        <hr className="my-4 w-full border-muted-foreground" />
        <div className="px-4 py-2">
          <p className="p-2 text-sm md:pb-2">{user.email}</p>
          <p className="p-2 text-sm md:pb-2">
            Role: {user.is_admin ? "Admin" : ""}
            {user.is_super_admin ? "Super Admin" : ""}
            {!user.is_super_admin && !user.is_admin ? "Vendor" : ""}
          </p>
          <p className="p-2 text-sm md:pb-2">{user.deleted ? "Banned" : ""}</p>
        </div>
        <div className="mt-auto flex w-full justify-center gap-4 p-4 pb-4">
          <div className="flex w-full justify-evenly">
            <RoleSelection user={user} />
          </div>
          <div className="flex w-full justify-evenly">
            <DeleteUser user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
