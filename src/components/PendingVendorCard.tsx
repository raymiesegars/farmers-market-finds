import { VendorProfile } from "@prisma/client";
import Image from "next/image";
import vendorCardPlaceholder from "/public/assets/vendor-card-placeholder.jpg";
import vendorApprove from "@/actions/vendorApprove";
import { Button } from "./ui/button";

interface PendingVendorCardProp {
  vendor: VendorProfile;
}

export default function PendingVendorCard({
  vendor: { id: vendorId, vendor_name, vendor_description, vendor_image_path },
}: PendingVendorCardProp) {
  const handleApprove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await vendorApprove(vendorId);
  };

  return (
    <div>
      <a className="block overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold">{vendor_name}</h2>
        </div>
        <div className="flex justify-center">
          <Image
            src={vendor_image_path || vendorCardPlaceholder}
            alt={`${vendor_name} image`}
            height={225}
            width={400}
            className="h-48 rounded-md border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
          />
        </div>
        <div className="px-4 py-2">
          <p>{vendor_description}</p>
          <Button
            onClick={handleApprove}
            type="submit"
            className="mt-2 rounded bg px-4 py-2 flex items-center"
          >
            Approve
          </Button>
        </div>

        <div className="mb-2 ml-2 flex flex-wrap gap-2"></div>
      </a>
    </div>
  );
}
