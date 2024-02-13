import React from "react";
import vendorsAction from "@/actions/printVendors"
import H1 from "@/components/ui/h1";

export default async function Vendors() {
  const vendors = await vendorsAction();

  return (
    <div>
      {vendors.map(vendor => {
        return (
          <div key={vendor.id} className="py-12 flex flex-col items-center text-left gap-8">
            <H1>{vendor.vendor_name}</H1>
            {/* <p>{vendor.vendor_email</p> */}
            <p>{vendor.vendor_description}</p>
          </div>
        )
      })
      }
    </div>
  )
}