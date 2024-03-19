import vendorApprove from "@/actions/vendorApprove";
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
import { VendorProfile } from "@prisma/client";

interface PendingVendorCardProp {
  vendor: VendorProfile;
}

export function ConfirmApproval({
  vendor: { id: vendorId },
}: PendingVendorCardProp) {
  const handleApprove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await vendorApprove(vendorId);
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2 w-1/2">Approve</Button>
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
              onClick={handleApprove}
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
