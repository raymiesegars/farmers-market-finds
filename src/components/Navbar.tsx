"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "/public/logo.png";
import { ModeToggle } from "./ui/toggle-mode";
import { Button } from "./ui/button";
import { MenuSquareIcon, XCircleIcon } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="p-5 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="link-hover flex flex-shrink-0 items-center">
            <Link href="/" passHref legacyBehavior>
              <a className="flex items-center space-x-2 text-xl font-extrabold">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  alt="Farmers Market Finds Logo"
                />
                <span>Farmers Market Finds</span>
              </a>
            </Link>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <Link href="/vendors" legacyBehavior>
              <a className="link-hover space-x-2 text-lg font-bold">
                <span>Vendors</span>
              </a>
            </Link>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild className="cursor-pointer">
                <SignInButton>
                  <span>Vendor Sign In</span>
                </SignInButton>
              </Button>
            </SignedOut>
            <ModeToggle />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XCircleIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuSquareIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="flex flex-col items-center space-y-3 px-2 pb-3 pt-3 sm:px-3">
            <Link href="/vendors" legacyBehavior>
              <a className="link-hover space-x-2 text-lg font-bold">
                <span>Vendors</span>
              </a>
            </Link>
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild className="cursor-pointer">
                <SignInButton>Vendor Sign In</SignInButton>
              </Button>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
