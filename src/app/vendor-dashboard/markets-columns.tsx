"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VendorBoothForm from "@/components/VendorBoothForm";
import { useState } from "react";
import { Market } from "@/lib/marketTypes";

export type Markets = {
  id: number;
  description: string;
  date: Date;
  hasBooth: any;
  weeklyBoothId?: number;
  marketId: number;
};

interface Props {
  market: Market;
}

export const marketColumns: ColumnDef<Markets>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(new Date(row.original.date));
      return formattedDate;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "Create/Edit Button",
    cell: ({ row }) => {
      const buttonWidth = "140px";

      if (!row.original.hasBooth) {
        return (
          <Dialog>
            <DialogTrigger>
              <Button
                style={{ minWidth: buttonWidth }}
                className="flex items-center"
              >
                <Plus className="mr-2 h-4 w-4 flex-1"></Plus>
                Create Booth
              </Button>
            </DialogTrigger>
            <DialogContent>
              <VendorBoothForm date={row.original.date} marketId={row.original.id} />
            </DialogContent>
          </Dialog>
        );
      } else {
        return (
          <Button
            style={{ minWidth: buttonWidth }}
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4 flex-1"></Edit>
            Edit Booth&nbsp;&nbsp;&nbsp;
          </Button>
        );
      }
    },
  },
];

//
