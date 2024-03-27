// import goodEdit from "@/actions/goodEdit";
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
import { Edit } from "lucide-react";

interface GoodProp {
  good: Good;
}

export function EditBoothGood({
  good: { id: good_id },
}: GoodProp) {
  const handleEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // await goodEdit(good_id);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
            
              className="flex items-center bg-[#00a5e7] hover:bg-[#00a5e799] mr-2"
            >
              <Edit className="mr-2 h-5 w-5 flex-1"></Edit>
              Edit Good&nbsp;&nbsp;&nbsp;
            </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden rounded-lg shadow-md sm:max-w-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-xl font-semibold">
            Are you sure you wish to approve this vendor?
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            If you click approve this vendor will be added into the database and
            able to create booths through Farmers Market Finds.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleEdit}
              type="submit"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow-sm"
            >
              Approve
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-[#de5246] px-4 py-2 font-medium shadow-sm hover:bg-[#f39998]"
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
