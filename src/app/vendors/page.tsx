"use server";

import getVendorsList from "@/actions/getVendorsList";
import VendorsList from "@/components/VendorsList";

const Vendors = async () => {
  const vendors = await getVendorsList();
  return <VendorsList vendorsProp={vendors} />;
};

export default Vendors;
