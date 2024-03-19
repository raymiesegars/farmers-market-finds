"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VendorBoothForm from "@/components/VendorBoothForm";
import { Market } from "@/lib/marketTypes";
import weeklyBoothCreation from "@/actions/weeklyBoothCreation";
import weeklyBoothRemoval from "@/actions/weeklyBoothRemoval";
import { useState } from "react";

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
    id: "manageBooth",
    header: "Add/Remove",
    cell: ({ row }) => {
      const market = row.original;
      //Handler for the weekly booth creation
      const handleWeeklyBoothCreation = async (
        event: React.MouseEvent<HTMLButtonElement>,
      ) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("marketId", row.original.id.toString());

        await weeklyBoothCreation(formData);
        location.reload();
      };
      //Handler for the weekly booth removal
      const handleWeeklyBoothRemoval = async (
        event: React.MouseEvent<HTMLButtonElement>,
      ) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("marketId", row.original.id.toString());

        await weeklyBoothRemoval(formData);
        location.reload();
      };


      return (
        <>
          {!market.hasBooth ? (
            <Button
              type="submit"
              onClick={handleWeeklyBoothCreation}
              className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 font-medium shadow-sm"
            >
              Add Booth
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleWeeklyBoothRemoval}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#de5246] px-4 py-2 font-medium shadow-sm hover:bg-[#f39998]"
            >
              Remove Booth
            </Button>
          )}
        </>
      );
    },
  },
  {
    id: "Create/Edit Button",
    header: "Manage Booth",
    cell: ({ row }) => {
      const buttonWidth = "140px";
      // const [vendorGoods, setVendorGoods] = useState([]);
      if (!row.original.hasBooth) {
        return (
          <></>
        );
      } else {
        return (      
          <Dialog>
          <DialogTrigger>
            <Button
              style={{ minWidth: buttonWidth }}
              className="flex items-center bg-[#00a5e7] hover:bg-[#00a5e799]"
            >
              <Edit className="mr-2 h-4 w-4 flex-1"></Edit>
              Edit Booth&nbsp;&nbsp;&nbsp;
            </Button>
          </DialogTrigger>
          <DialogContent>
            <VendorBoothForm
              date={row.original.date}
              marketId={row.original.id}
              weeklyBoothId={row.original.hasBooth.id}
            />
          </DialogContent>
        </Dialog>
        );
      }
    },
  },
];

//
