import Check from "@/actions/check";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import Image from "next/image";
import PrintVendors from "@/actions/printVendors";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <main className="pl-16 pr-16 pt-6 pb-6">
      <HomePage />
    </main>
  );
}
