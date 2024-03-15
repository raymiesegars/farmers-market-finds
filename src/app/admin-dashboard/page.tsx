"use server";

import getUnapprovedVendorsList from "@/actions/getUnapprovedVendorsList";
import SuperAdminDashboardVendorsList from "@/components/SuperAdminDashboardVendorsList";

const Vendors = async () => {
  const vendors = await getUnapprovedVendorsList();
  return <SuperAdminDashboardVendorsList vendorsProp={vendors} />;
};

export default Vendors;
