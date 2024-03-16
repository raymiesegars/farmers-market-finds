"use server";

import getApprovedVendorsList from "@/actions/getApprovedVendorsList";
import getUnapprovedVendorsList from "@/actions/getUnapprovedVendorsList";
import AdminDashboardVendorsList from "@/components/AdminDashboardVendorsList";
import UnapproveVendors from "@/components/UnapproveVendors";

const Vendors = async () => {
  const unapprovedVendors = await getUnapprovedVendorsList();
  const vendors = await getApprovedVendorsList();
  return (
    <>
      <AdminDashboardVendorsList vendorsProp={unapprovedVendors} />
      <hr className="border-muted" />
      <UnapproveVendors vendorsProp={vendors} />
    </>
  );
};

export default Vendors;
