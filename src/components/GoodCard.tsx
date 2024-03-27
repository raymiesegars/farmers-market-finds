"use client";

import Image from "next/image";
import { DeleteBoothGood } from "./DeleteBoothGood";
import { EditBoothGood } from "./EditBoothGood";

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
    <div className="mx-auto max-w-md overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="flex h-full flex-col justify-between">
        <div className="flex p-4">
          <div className="relative mr-3 h-24 w-24 flex-shrink-0">
            <Image
              src={good.global_good.image || "/assets/user-placeholder.png"}
              alt={good.global_good.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col justify-around">
            <h2 className="text-lg font-bold">{good.global_good.name}</h2>
            <p>$ {good.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <EditBoothGood good={good} />
          <DeleteBoothGood good={good} />
        </div>
      </div>
    </div>
  );
}
