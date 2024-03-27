"use client";

import Image from "next/image";

interface Good {
  id: number;
  description: string;
  price: number;
  global_good_id: number;
  weekly_booths_id: number;
  global_good: {
    id: number;
    name: string;
    image: string | null;
    type: string | null;
  };
}

export default function GoodCard({ good }: Good) {
  return (
    <div className="block overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold">{good.global_good.name}</h2>
      </div>
      <div className="flex justify-center">
        <div className="w-auto">
          <Image
            src={good.global_good.image || "/assets/user-placeholder.png"}
            alt={`${name} image`}
            height={225}
            width={300}
            className="h-48 rounded-full border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
          />
        </div>
      </div>
      <hr className="my-4 w-full border-muted-foreground" />
      <div className="px-4 py-2">
        <p className="p-2 text-sm md:pb-2">{good.price}</p>
      </div>
      <div className="mt-auto flex w-full justify-center gap-4 p-4 pb-4">
        <div className="flex w-full justify-evenly"></div>
        <div className="flex w-full justify-evenly"></div>
      </div>
    </div>
  );
}
