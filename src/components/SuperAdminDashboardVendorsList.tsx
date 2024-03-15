"use client";

import { useState } from "react";
import H1 from "./ui/h1";
import PendingVendorCard from "./PendingVendorCard";

interface VendorProfile {
  id: number;
  vendor_name: string;
  vendor_description: string;
  vendor_image_path: string | null;
  user_id: string;
  approved: boolean;
}

export default function SuperAdminDashboardVendorsList({
  vendorsProp,
}: {
  vendorsProp: VendorProfile[];
}) {
  const [vendors, setVendors] = useState<VendorProfile[]>(vendorsProp);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex justify-center">
      <div className="max-w-full p-4">
        <H1 className="mb-6 text-center text-3xl font-bold">Pending Vendors</H1>
        <div className="mb-4">
          <input
            type="text"
            className="global-input block w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <PendingVendorCard key={vendor.id} vendor={vendor} />
            ))
          ) : (
            <p className="col-span-full text-center">No vendors found</p>
          )}
        </div>
      </div>
    </div>
  );
}
