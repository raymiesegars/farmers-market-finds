"use client";

import { useState } from "react";
import UserCard from "./UserCard";
import H1 from "./ui/h1";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_super_admin: boolean;
  deleted: boolean;
}

export default function UserCardList({
  userProp,
}: {
  userProp: UserProfile[];
}) {
  const [users, setUsers] = useState<UserProfile[]>(userProp);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex justify-center">
      <div className="max-w-full p-8 md:p-24">
        <H1 className="mb-6 text-center text-3xl font-bold">Users</H1>
        <div className="mb-4">
          <input
            type="text"
            className="global-input block w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="col-span-full text-center">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}
