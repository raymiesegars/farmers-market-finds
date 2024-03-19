"use client";

import vendorFormSubmission from "@/actions/vendorFormSubmission";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const VendorForm = () => {
  return (
    <div className="flex flex-col items-center pb-20 pt-20">
      <div className="w-full max-w-md rounded-lg p-8 shadow-md">
        <h1 className="mb-4 text-center text-xl font-bold">Vendor Sign Up</h1>
        <form action={vendorFormSubmission}>
          <div className="mb-4 pb-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="vendor_name"
              className="global-input mt-1 block w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
            />
          </div>

          {/* <div className="mb-4 pb-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div> */}

          <div className="mb-4 pb-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Tell Us About Your Vendor
            </label>
            <Textarea
              id="description"
              name="vendor_description"
              className="global-input mt-1 block h-32 w-full rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;
