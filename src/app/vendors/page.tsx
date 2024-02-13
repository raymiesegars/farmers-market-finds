import React from "react";
import vendorsAction from "@/actions/printVendors"
import H1 from "@/components/ui/h1";

export default async function Vendors() {
  const vendors = await vendorsAction();

  return (
    <div>
      {vendors.map(vendor => {
        return (
          <div key={vendor.id} className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <H1 className="pb-2">{vendor.vendor_name}</H1>
                  {/* <p>{vendor.vendor_email</p> */}
                  <p className="mt-2 text-lg">{vendor.vendor_description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </div >
  )
}