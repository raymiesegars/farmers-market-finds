import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, auth } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getUser from "@/actions/getUser";
import AdminNavbar from "@/components/AdminNavbar";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import VendorNavbar from "@/components/VendorNavbar";

interface UserInfo {
  id: string;
  is_super_admin?: boolean;
  is_admin?: boolean;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farmers Market Finds",
  description: "A website to help you see what Vendors at the local market will be carrying.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();
  const userInfo = await getUser(user.userId);

  let NavbarToRender = Navbar;

  if (userInfo?.is_super_admin) {
    NavbarToRender = SuperAdminNavbar;
  } else if (userInfo?.is_admin) {
    NavbarToRender = AdminNavbar;
  } else if (userInfo) {
    // If userInfo exists but is neither super admin nor admin, render VendorNavbar
    NavbarToRender = VendorNavbar;
  }
  
  return (
    <ClerkProvider afterSignInUrl="/vendorform" afterSignUpUrl="/vendorform">
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="flex flex-col min-h-screen">
              <NavbarToRender />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider >
  );
}
