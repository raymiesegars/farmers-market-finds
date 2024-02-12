import Check from "@/actions/check";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" p-24">
      <Navbar />
      <section className="py-12 flex flex-col items-center text-left gap-8">
        <H1>Welcome to Farmers Market Finds</H1>
          <div>
            <h2 className="text-2xl font-bold">For Shoppers:</h2>
            <p className="text-2xl text-muted-foreground">
              Explore the bounty of your local farmers market before stepping out the door.
              Preview diverse produce and goods that vendors will bring to the upcoming market,
              making your visit more efficient and exciting.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">For Vendors:</h2>
            <p className="text-2xl text-muted-foreground">This is your space to showcase your offerings and connect with a wider audience. Join us in cultivating a vibrant community
              around local agriculture.No shopping or login required—just pure planning and discovery.</p>
          </div>
      </section>
      <div className="flex gap-6 items-center justify-center">
        <Button>Learn More</Button>
        <Button>Vendor Sign Up</Button>
        <Button onClick={() => {
          Check()
        }}>check</Button>
      </div>
    </main>
  );
}
