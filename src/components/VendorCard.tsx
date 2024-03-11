import { VendorProfile } from "@prisma/client";
import Image from "next/image";
import vendorCardPlaceholder from "/public/assets/vendor-card-placeholder.jpg";
import Link from "next/link"; // Assuming you might want to link to a vendor detail page.

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
        </div>
        {/* Optional: Include a section for displaying technologies or services provided by the vendor, similar to the project cards */}
        <div className="mb-2 ml-2 flex flex-wrap gap-2">
          {/* Example: Iterate over technologies/services if applicable */}
          {/* vendor.technologies.map((tech, index) => (
            <span key={index} className="inline-flex h-8 w-8 items-center justify-center rounded-full">
              {getTechnologyIcon(tech.name)}
            </span>
          )) */}
        </div>
      </a>
    </Link>
  );
}
