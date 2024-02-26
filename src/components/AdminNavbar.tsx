"use client";

import { SignedOut, UserButton, SignedIn, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from "@/assets/logo.png";
import { ModeToggle } from './ui/toggle-mode'
import { Button } from './ui/button'
import { MenuSquareIcon, XCircleIcon } from 'lucide-react';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="shadow-sm p-5">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center link-hover">
            <Link href="/" passHref legacyBehavior>
              <a className="flex items-center space-x-2 text-xl font-extrabold">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  alt="Farmers Market Finds Logo"
                />
                <span>Farmers Market Finds</span>
                <span>Farmers Market Finds</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/vendors" legacyBehavior>
              <a className="space-x-2 text-lg font-bold link-hover"><span>Vendors</span></a>
            </Link>

            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild className='cursor-pointer'>
                <SignInButton>
                  <span>Vendor Sign In</span>
                </SignInButton>
              </Button>
            </SignedOut>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
          <div className="px-2 pt-3 pb-3 space-y-3 sm:px-3 flex flex-col items-center">
            <Link href="/vendors" legacyBehavior>
              <a className="space-x-2 text-lg font-bold link-hover"><span>Vendors</span></a>
            </Link>
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild className='cursor-pointer'>
                <SignInButton>
                  Vendor Sign In
                </SignInButton>
              </Button>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  )
}
