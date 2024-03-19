import { VendorProfile } from "@prisma/client";
import Image from "next/image";
import vendorCardPlaceholder from "/public/assets/vendor-card-placeholder.jpg";
import vendorApprove from "@/actions/vendorApprove";
import { ConfirmApproval } from "./ConfirmApproval";
import { DeleteVendor } from "./DeleteVendor";

interface PendingVendorCardProp {
  vendor: VendorProfile;
}

export default function PendingVendorCard({ vendor }: any) {
  const handleApprove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await vendorApprove(vendor.vendorId);
  };

  return (
    <div className="flex w-full flex-col">
      <a className="flex h-full flex-col overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold">{vendor.vendor_name}</h2>
        </div>
        <div className="flex flex-grow justify-center">
          <div className="w-auto">
            <Image
              src={vendor.vendor_image_path || vendorCardPlaceholder}
              alt={`${vendor.vendor_name} image`}
              height={225}
              width={400}
              className="h-48 rounded-md border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
            />
          </div>
        </div>
        <hr className="my-4 w-full border-muted-foreground" />
        <div className="flex flex-grow flex-col px-4 py-2">
          <p className="max-h-24 min-h-24 overflow-auto p-2 text-sm md:pb-2">
            {vendor.vendor_description}
          </p>
          <div className="mt-auto flex w-full justify-center gap-4 p-8 py-2">
            <div className="flex w-full justify-evenly">
              <ConfirmApproval vendor={vendor} />
              <DeleteVendor vendor={vendor} />
            </div>
          </div>
        </div>

        <div className="mb-2 ml-2 flex flex-wrap gap-2"></div>
      </a>
    </div>
  );
}
