import { User } from "@prisma/client";
import Link from "next/link";

interface UserCardProp {
  user: User;
}

export default function UserCard({
  user: { name, email, deleted, is_admin, is_super_admin },
}: UserCardProp) {
  return (
    <Link href="/" passHref legacyBehavior>
      <a className="block overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold">{name}</h2>
        </div>
        {/* <div className="flex justify-center">
          <div className="w-auto">
            <Image
              src={image_url || vendorCardPlaceholder}
              alt={`${name} image`}
              height={225}
              width={400}
              className="h-48 rounded-md border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
            />
          </div>
        </div> */}
        <hr className="my-4 w-full border-muted-foreground" />
        <div className="px-4 py-2">
          <p className="p-2 text-sm md:pb-2">{email}</p>

          <p className="p-2 text-sm md:pb-2">Admin: {is_admin}</p>
          <p className="p-2 text-sm md:pb-2">Super Admin: {is_super_admin}</p>
          <p className="p-2 text-sm md:pb-2">Banned: {deleted}</p>
        </div>
      </a>
    </Link>
  );
}
