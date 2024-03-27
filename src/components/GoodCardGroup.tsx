"use client";

import getBoothGoods from "@/actions/getBoothGoods";
import { useEffect, useState } from "react";
import GoodCard from "./GoodCard";
import { CircleDashedIcon } from "lucide-react";

interface GlobalGood {
  id: number;
  name: string;
  image: string | null;
  type: string | null;
}

interface Good {
  id: number;
  description: string;
  price: number;
  global_good_id: number;
  weekly_booths_id: number;
  global_good: GlobalGood;
}

export default function GoodCardGroup({
  weeklyBoothId,
}: {
  weeklyBoothId: number;
}) {
  const [goods, setGoods] = useState<Good[] | null>(null);

  useEffect(() => {
    async function fetchGoods() {
      const fetchedGoods = await getBoothGoods(weeklyBoothId);
      setGoods(fetchedGoods);
      console.log(fetchedGoods);
    }

    fetchGoods();
  }, [weeklyBoothId]);

  if (!goods) {
    return (
      <div className="flex h-screen justify-center pt-20">
        <CircleDashedIcon className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const weeklyGoods = goods;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {weeklyGoods.length > 0 ? (
          weeklyGoods.map((good) => <GoodCard key={good.id} good={good} />)
        ) : (
          <p className="col-span-full text-center">No users found</p>
        )}
      </div>
    </>
  );
}
