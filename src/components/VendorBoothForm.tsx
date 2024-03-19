import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/lib/utils";
import GlobalGoodsItem from "./GlobalGoodsItem";
import { GlobalGoods } from "@prisma/client";
import vendorGoodSubmission from "@/actions/vendorGoodSubmission";

interface VendorBoothFormProps {
  date: Date;
  marketId: any;
  weeklyBoothId: any;
}

interface Good {
  id: number;
  name: string;
  type: string | null;
  image: string | null;
}

const VendorBoothForm = ({
  date,
  marketId,
  weeklyBoothId,
}: VendorBoothFormProps) => {
  const formattedDate = formatDate(new Date(date));
  const [goods, setGoods] = useState<Good[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGood, setSelectedGood] = useState<Good | null>(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (marketId === undefined) {
    return <div>Market ID is not provided</div>;
  }

  useEffect(() => {
    fetch("/api/globalGoods", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredGoods = goods.filter((good) =>
    good.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectGood = (selectedGood: GlobalGoods) => {
    const transformedGood: Good = {
      id: selectedGood.id,
      name: selectedGood.name,
      type: selectedGood.type || "",
      image: selectedGood.image || "",
    };
    setSelectedGood(transformedGood);
  };

  return (
    <div className="inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl p-8 shadow-md">
        <div className="p-5">
          <h1 className="mb-4 text-center text-xl font-bold">
            Your Booth for {formattedDate}
          </h1>
          <form action={vendorGoodSubmission}>
            <div className="mb-4 pb-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Search For Goods You Will Carry
              </label>
              <input
                type="text"
                id="search"
                name="vendor_name"
                className="global-input mt-1 block w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
                placeholder="Search goods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-auto">
              {filteredGoods.map((good) => (
                <GlobalGoodsItem
                  key={good.id}
                  good={good}
                  onSelect={handleSelectGood}
                />
              ))}

              {filteredGoods.length === 0 && (
                <p className="py-5 text-center">No Goods Found</p>
              )}
            </div>

            {/* Section to display the selected good */}
            {selectedGood && (
              <div className="mb-4">
                {/* Invisible input fields to pass our data for the formData */}
                <input
                  name="globalGoodId"
                  type="hidden"
                  value={selectedGood.id}
                ></input>
                <input
                  name="weeklyBoothId"
                  type="hidden"
                  value={weeklyBoothId}
                ></input>

                <h2 className="text-lg font-semibold">Selected Good:</h2>
                <div className="flex items-center gap-2">
                  <div className="relative h-20 w-20">
                    {selectedGood.image ? (
                      <img
                        src={selectedGood.image}
                        alt={selectedGood.name}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <img
                        src="/public/assets/general-goods-placeholder.jpg"
                        alt="Placeholder"
                        className="rounded-md object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p>{selectedGood.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedGood.type || "No type specified"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-2 pt-2">
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="global-input mt-1 block w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
                placeholder="Enter price (e.g., $100)"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-2 pb-2 pt-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Item Description
              </label>
              <Textarea
                id="description"
                name="description"
                className="global-input mt-1 block h-32 w-full rounded-md p-2 focus:ring focus:ring-opacity-50"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                onClick={() => {
                  location.reload();
                }}
                className="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Add Good
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <div>
      {filteredGoods.map((good) => (
                <GlobalGoodsItem
                  key={good.id}
                  good={good}
                  onSelect={handleSelectGood}
                />
              ))}

              {filteredGoods.length === 0 && (
                <p className="py-5 text-center">No Goods Found</p>
              )}
      </div> */}
    </div>
  );
};

export default VendorBoothForm;
