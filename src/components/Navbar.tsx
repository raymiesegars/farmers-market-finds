"use client"

import { SignedOut, UserButton, SignedIn, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.png";
import { ModeToggle } from './ui/toggle-mode'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { Button } from './ui/button'


export default function Navbar() {

  return (
    <header className="shadow-sm">
      <NavigationMenu className='w-full'>
        <NavigationMenuList>
          {/* max-w-5xl m-auto px-1 py-5 flex items-center text-center justify-between' */}
          <NavigationMenuItem>
            <Link href="/" className="flex items-center gap-3" legacyBehavior passHref>


              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} p-4 tracking-tight`}>

                <div className='text-xl p-1 font-extrabold'>
                  <Image
                    src={logo}
                    width={40}
                    height={40}
                    alt="Farmers Market Finds Logo"
                  />
                  <p>Farmers Market Finds</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>

          <NavigationMenuItem className='flex gap-2 p-2 items-center'>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <Button asChild>
                  <SignInButton>
                    Vendor Sign In
                  </SignInButton>
                </Button>
              </SignedOut>
          </NavigationMenuItem>

        </NavigationMenuList>

      </NavigationMenu>
    </header >
  )
}
