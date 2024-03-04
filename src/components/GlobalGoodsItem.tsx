import { GlobalGoods } from "@prisma/client";
import Image from "next/image";
import generalGoodsPlaceholder from "/public/assets/general-goods-placeholder.jpg"

interface GlobalGoodsItemProp {
  good: GlobalGoods;
}

export default function GlobalGoodsItem({ good: {
  name,
  image,
  type
} }: GlobalGoodsItemProp) {
  return (
    <article className="flex items-center gap-3 border rounded-lg p-5 hover:bg-muted/60">
      <div className="w-20 h-20 relative">
        <Image
          src={image || generalGoodsPlaceholder}
          alt={`${name} image`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </ div>
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{name}</h2>
          <p className="text-muted-foreground"></p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            {type}
          </p>
        </div>
      </div>
    </article >
  )
}