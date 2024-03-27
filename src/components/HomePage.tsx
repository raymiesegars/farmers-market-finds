import Head from "next/head";
import H1 from "./ui/h1";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/logo.png";
import { Button } from "./ui/button";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Farmers Market Finds</title>
        <meta
          name="description"
          content="Find vendors and goods at your local farmers market."
        />
      </Head>

      <div className="flex flex-col">
        <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-md">
          <Image
            src="/assets/farmers-market-finds-banner.png"
            alt="Farmers Market Finds Banner"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />

          <div
            className="z-10 flex flex-col items-center rounded-lg p-4 text-center"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.55) 100%)",
            }}
          >
            {" "}
            <div className="flex items-center">
              {" "}
              <Image
                src={logo}
                width={60}
                height={60}
                alt="Farmers Market Finds Logo"
                className="mb-4"
              />
              <div>
                <H1
                  style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)" }}
                  className="mb-4 mr-10 text-4xl font-bold text-white"
                >
                  Farmers Market Finds
                </H1>
              </div>
            </div>
            <p
              style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)" }}
              className="mt-4 text-xl text-white"
            >
              Discover local vendors and goods at your fingertips.
            </p>
          </div>
        </div>
        <hr className="mt-8 border-muted-foreground" />
        <div className="mx-auto p-8">
          <div className="text-center">
            <p className="text-4xl font-extrabold tracking-tight">
              Welcome to Farmers Market Finds
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="text-center">
              <p className="text-3xl font-extrabold tracking-tight">
                For Everyone
              </p>
              <ul
                className="mx-auto list-disc pl-5 text-lg"
                style={{ maxWidth: "300px" }}
              >
                {" "}
                <li>Browse goods that local farmers will be selling</li>
                <li>Search with specific dates and goods in mind</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-3xl font-extrabold tracking-tight">
                For Vendors
              </p>
              <ul
                className="mx-auto list-disc pl-5 text-lg"
                style={{ maxWidth: "300px" }}
              >
                {" "}
                <li>Apply for our site</li>
                <li>List your dates and goods</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="mt-8 border-muted-foreground" />

        <div className="p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Why Choose Farmers Market Finds?
            </h2>
            <p className="mb-4 text-lg">
              Our platform connects you directly with local vendors, offering a
              fresh take on shopping for produce and handcrafted goods. Discover
              new favorites, and plan your visit to the farmers market with
              ease.
            </p>
            <ul className="list-disc pl-5 text-lg">
              <li>
                Real-time updates on vendor attendance and product availability
              </li>
              <li>
                Exclusive deals and offers only available through our platform
              </li>
              <li>
                A diverse selection of goods from trusted local farmers and
                artisans
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-8 border-muted-foreground" />

        <div className="p-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Are You a Vendor?</h2>
            <p className="mb-6">
              Join our community of vendors and increase your visibility to
              thousands of potential customers. Sign up now and start sharing
              your booths on Farmers Market Finds.
            </p>
            <Link href="/vendorform" legacyBehavior>
              <Button>Vendor Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
