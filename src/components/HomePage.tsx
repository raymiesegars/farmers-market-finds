import { InputWithButton } from "./ui/InputWithButton";
import H1 from "./ui/h1";

export default function HomePage() {
  return (
    <>
      <section>
        <section className="flex flex-col items-center gap-8 py-12 text-center">
          <H1>Welcome to Farmers Market Finds</H1>
          <div className="w-full text-left md:flex md:items-start md:justify-center md:gap-12">
            <div className="flex-1 p-4 md:p-0">
              <h2 className="text-2xl font-bold">For Shoppers:</h2>
              <p className="text-xl">
                Explore the bounty of your local farmers market before stepping
                out the door. Preview diverse produce and goods that vendors
                will bring to the upcoming market, making your visit more
                efficient and exciting.
              </p>
            </div>
            <div className="flex-1 p-4 md:p-0">
              <h2 className="text-2xl font-bold">For Vendors:</h2>
              <p className="text-xl">
                This is your space to showcase your offerings and connect with a
                wider audience. Join us in cultivating a vibrant community
                around local agriculture. No shopping or login required—just
                pure planning and discovery.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex items-center justify-center gap-6 md:w-full">
          <InputWithButton></InputWithButton>
        </div>
      </section>
    </>
  );
}
