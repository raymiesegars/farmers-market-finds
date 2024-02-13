import React from "react";
import vendorsAction from "@/actions/printVendors"
import H1 from "@/components/ui/h1";

export default async function Vendors() {
  const vendors = await vendorsAction();

  return (
    <div>
      {vendors.map(vendor => {
        return (
          <div key={vendor.id} className="md:flex md:justify-center md:items-start md:gap-12 w-full text-left">
            <H1>{vendor.vendor_name}</H1>
            {/* <p>{vendor.vendor_email</p> */}
            <p className="">{vendor.vendor_description}</p>
          </div>
        )
      })
      }
    </div>
  )
}