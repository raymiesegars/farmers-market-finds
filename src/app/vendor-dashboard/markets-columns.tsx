"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/lib/utils";
import { Edit, Plus } from "lucide-react";

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
      const buttonWidth = "140px";

      if (!row.original.hasBooth) {
        return <Button style={{ minWidth: buttonWidth }}><Plus className="mr-2 h-4 w-4"></Plus>Create Booth</Button>
      } else {  
        return <Button style={{ minWidth: buttonWidth }}><Edit className="mr-2 h-4 w-4"></Edit>Edit Booth</Button>
      }

    }
  },
]

// 


