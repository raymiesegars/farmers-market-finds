'use client';

import vendorFormSubmission from "@/actions/vendorFormSubmission";
import { Button } from "./ui/button";

const VendorForm = () => {
  return (
    <div className="flex flex-col items-center pt-20 pb-20">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Vendor Sign Up</h1>
        <form action={vendorFormSubmission}>
          <div className="mb-4 pb-2">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input type="text" id="name" name="vendor_name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>

          {/* <div className="mb-4 pb-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div> */}

          <div className="mb-4 pb-2">
            <label htmlFor="description" className="block text-sm font-medium">About Us</label>
            <input type="text" id="description" name="vendor_description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-opacity-50 h-32" />
          </div>

          <div>
            <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>



  );
}

export default VendorForm;