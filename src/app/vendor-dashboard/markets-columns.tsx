"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Markets = {
  id: number
  description: string
  date: Date
}

export const marketColumns: ColumnDef<Markets>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: 'Create/Edit Button',
    cell: ({ row }) => {
      console.log({row})

      return <Button>Create Booth</Button>
    }
  },
]

// 


