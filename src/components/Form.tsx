'use client';

import vendorFormSubmission from "@/actions/vendorFormSubmission";
import { Button } from "./ui/button";

const VendorForm = () => {
  return ( 
    <form action={vendorFormSubmission}>
      <label htmlFor="vendor_name">Vendor name:</label>
      <input type="text" id="vendor_name" name="vendor_name"></input>
      <label htmlFor="vendor_description">Vendor description:</label>
      <input type="text" id="vendor_description" name="vendor_description"></input>
      <Button type="submit">Submit</Button>
    </form>


   );
}
 
export default VendorForm;