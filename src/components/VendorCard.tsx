import { VendorProfile } from "@prisma/client";
import Image from "next/image";
import vendorCardPlaceholder from "/public/assets/vendor-card-placeholder.jpg";
import Link from "next/link";

interface VendorCardProp {
  vendor: VendorProfile;
}

export default function VendorCard({
  vendor: { vendor_name, vendor_description, vendor_image_path },
}: VendorCardProp) {
  return (
    <Link href="/" passHref legacyBehavior>
      <a className="block overflow-hidden rounded-lg border shadow-lg transition-shadow hover:border-gray-300 hover:shadow-xl">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-semibold">{vendor_name}</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-auto">
            <Image
              src={vendor_image_path || vendorCardPlaceholder}
              alt={`${vendor_name} image`}
              height={225}
              width={400}
              className="h-48 rounded-md border-2 border-gray-300 object-cover shadow-md dark:border-gray-700"
            />
          </div>
        </div>
        <hr className="my-4 w-full border-muted-foreground" />
        <div className="px-4 py-2">
          <p className="max-h-24 min-h-24 overflow-auto p-2 text-sm md:pb-2">
            {vendor_description}
          </p>
        </div>
      </a>
    </Link>
  );
}
