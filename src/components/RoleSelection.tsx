"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import setRoleSuperAdmin from "@/actions/setRoleSuperAdmin";
import setRoleAdmin from "@/actions/setRoleAdmin";
import setRoleVendor from "@/actions/setRoleVendor";

interface UserProp {
  user: User;
}

export function RoleSelection({ user: { id: userId } }: UserProp) {
  const setRoleSuperAdminHandler = () => {
    setRoleSuperAdmin(userId).then((res) => {
      location.reload();
    });
  };

  const setRoleAdminHandler = () => {
    setRoleAdmin(userId).then((res) => {
      location.reload();
    });
  };

  const setRoleVendorHandler = () => {
    setRoleVendor(userId).then((res) => {
      location.reload();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-2 w-3/4">Change Role</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="role">
          <DropdownMenuRadioItem
            value="super-admin"
            onClick={() => {
              setRoleSuperAdminHandler();
            }}
          >
            Super Admin
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="admin"
            onClick={() => {
              setRoleAdminHandler();
            }}
          >
            Admin
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="vendor"
            onClick={() => {
              setRoleVendorHandler();
            }}
          >
            Vendor
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
