"use server";

import getAllUsers from "@/actions/getAllUsers";
import UserCardList from "@/components/UserCardList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Vendors = async () => {
  const users = await getAllUsers();
  return (
    <>
      <hr className="border-muted" />
      <Link href="/admin-dashboard" className="flex justify-center pt-10 pb-10">
        {" "}
        <div>
          <Button>Go to Admin Dashboard</Button>
        </div>
      </Link>
      <hr className="border-muted" />
      <UserCardList userProp={users} />
    </>
  );
};

export default Vendors;
