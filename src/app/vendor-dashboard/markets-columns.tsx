"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Markets = {
  id: number
  description: string
  date: Date
  hasBooth: any
}

export const marketColumns: ColumnDef<Markets>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(new Date(row.original.date))
      return formattedDate
    }
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: 'Create/Edit Button',
    cell: ({ row }) => {
      const buttonWidth = "120px";

      if (!row.original.hasBooth) {
        return <Button style={{ width: buttonWidth }}>Create Booth</Button>
      } else {
        return <Button style={{ width: buttonWidth }}>Edit Booth</Button>
      }

    }
  },
]

// 


