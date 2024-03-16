"use server";

import getApprovedVendorsList from "@/actions/getApprovedVendorsList";
import getUnapprovedVendorsList from "@/actions/getUnapprovedVendorsList";
import AdminDashboardVendorsList from "@/components/AdminDashboardVendorsList";
import UnapproveVendors from "@/components/UnapproveVendors";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Vendors = async () => {
  const unapprovedVendors = await getUnapprovedVendorsList();
  const vendors = await getApprovedVendorsList();
  return (
    <>
      <hr className="border-muted" />
      <Link href="/admin-dashboard" className="flex justify-center pt-10 pb-10">
        {" "}
        <a>
          <Button>Go to Admin Dashboard</Button>
        </a>
      </Link>
      <hr className="border-muted" />
    </>
  );
};

export default Vendors;
