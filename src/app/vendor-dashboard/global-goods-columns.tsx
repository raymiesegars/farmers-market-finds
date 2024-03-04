"use client"

import { ColumnDef } from "@tanstack/react-table"

export type GlobalGoods = {
  id: number
  name: string
  image: string
}

export const globalGoodsColumns: ColumnDef<GlobalGoods>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Default Image",
  },
]

