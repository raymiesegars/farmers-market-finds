import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/lib/utils";
import GlobalGoodsItem from "./GlobalGoodsItem";
import { GlobalGoods } from "@prisma/client";
import weeklyBoothCreation from "@/actions/weeklyBoothCreation";
import { auth } from "@clerk/nextjs";
import getUser from "@/actions/getUser";

interface VendorBoothFormProps {
  date: Date;
  marketId: any;
}

interface Good {
  id: number;
  name: string;
  type: string | null;
  image: string | null;
}

const VendorBoothForm = ({ date, marketId }: VendorBoothFormProps) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedGood || !price || !description) {
      alert("Please select a good and fill in all fields.");
      return;
    }

    const payload = {
      globalGoodId: selectedGood.id,
      price: parseFloat(price),
      description,
    };

    try {
      const response = await fetch("/api/setGood/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Good successfully added to the booth!");
        setSelectedGood(null);
        setPrice("");
        setDescription("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to submit good:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl p-8 shadow-md">
        <div className="p-5">
          <h1 className="mb-4 text-center text-xl font-bold">
            Your Booth for {formattedDate}
          </h1>
          <form className="space-y-4 p-2" action={weeklyBoothCreation}>
            <input type="hidden" name="marketId" value={marketId}></input>
            <label className="block text-center text-lg font-medium">
              Manage Booth Status
            </label>
            <div className="flex justify-center gap-4">
              {" "}
              <Button
                type="submit"
                className="justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Add Booth
              </Button>
              <Button
                type="submit"
                className="justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Remove Booth
              </Button>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
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
                type="text"
                id="price"
                name="vendor_price"
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
                name="vendor_description"
                className="global-input mt-1 block h-32 w-full rounded-md focus:ring focus:ring-opacity-50"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Add Good
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorBoothForm;
