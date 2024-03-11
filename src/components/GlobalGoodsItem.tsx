import { GlobalGoods } from "@prisma/client";
import Image from "next/image";
import generalGoodsPlaceholder from "/public/assets/general-goods-placeholder.jpg";

interface GlobalGoodsItemProp {
  good: GlobalGoods;
  onSelect: (good: GlobalGoods) => void;
}

export default function GlobalGoodsItem({
  good,
  onSelect,
}: GlobalGoodsItemProp) {
  return (
    <article
      className="flex cursor-pointer items-center gap-3 rounded-lg  border p-5 hover:bg-muted/60"
      onClick={() => onSelect(good)}
    >
      <div className="relative h-20 w-20">
        <Image
          src={good.image || generalGoodsPlaceholder}
          alt={`${good.name} image`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex-grow space-y-3">
        <div>
          <h2 className=" text-xl font-medium ">{good.name}</h2>{" "}
          {/* Adjusted for destructuring */}
          <p className="text-muted-foreground"></p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            {good.type} {/* Adjusted for destructuring */}
          </p>
        </div>
      </div>
    </article>
  );
}
