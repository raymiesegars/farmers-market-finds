"use server";

import getApprovedVendorsList from "@/actions/getApprovedVendorsList";
import VendorsList from "@/components/VendorsList";

const Vendors = async () => {
  const vendors = await getApprovedVendorsList();
  return <VendorsList vendorsProp={vendors} />;
};

export default Vendors;
