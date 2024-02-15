"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

