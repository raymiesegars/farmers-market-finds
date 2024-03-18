"use client";

import userDelete from "@/actions/userDelete";
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
import { User } from "@prisma/client";

interface UserProp {
  user: User;
}

export function DeleteUser({ user: { id: userId } }: UserProp) {
  const handleDeny = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await userDelete(userId);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2 w-3/4 bg-[#de5246] hover:bg-[#f39998]">
          Ban
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden rounded-lg shadow-md sm:max-w-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-xl font-semibold">
            Are you sure you wish to ban this user?
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            If you click ban this user will be deleted from the database and
            they will not be able to be recovered without creating another
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button
                onClick={handleDeny}
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-[#de5246] px-4 py-2 font-medium shadow-sm hover:bg-[#f39998]"
              ></Button>
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
