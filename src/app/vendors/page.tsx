"use client";

import React, { useEffect, useState } from "react";
import H1 from "@/components/ui/h1";
import VendorCard from "@/components/VendorCard";

interface VendorProfile {
  id: number;
  vendor_name: string;
  vendor_description: string;
  vendor_image_path: string | null;
  user_id: string;
  approved: boolean;
}

const Vendors = () => {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/vendorProfiles", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setVendors(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
        <H1 className="mb-6 text-center text-3xl font-bold">Our Vendors</H1>
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
              <VendorCard key={vendor.id} vendor={vendor} />
            ))
          ) : (
            <p className="col-span-full text-center">No vendors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
