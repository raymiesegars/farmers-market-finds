"use client";

import goodDelete from "@/actions/goodDelete";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Good } from "@prisma/client";
import { TrashIcon } from "lucide-react";

interface GoodProp {
  good: Good;
}

export function DeleteBoothGood({ good: { id: goodId } }: GoodProp) {
  const handleDeny = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await goodDelete(goodId);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-25 h-25 bg-[#de5246] hover:bg-[#f39998]">
          <TrashIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden rounded-lg shadow-md sm:max-w-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-xl font-semibold">
            Are you sure you wish to delete this good?
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            If you click delete this good will be deleted from the database and
            it will not be able to be recovered without creating another
            good.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button
                onClick={handleDeny}
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-[#de5246] px-4 py-2 font-medium shadow-sm hover:bg-[#f39998]"
              >Delete</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow-sm"
              >
                Return
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
