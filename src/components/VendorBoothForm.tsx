"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/lib/utils";
import GlobalGoodsItem from "./GlobalGoodsItem";
import { GlobalGoods } from "@prisma/client";
import vendorGoodSubmission from "@/actions/vendorGoodSubmission";
import GoodCardGroup from "./GoodCardGroup";
import { ArrowLeft, CircleDashedIcon } from "lucide-react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <Button
          onClick={() => router.push("/vendor-dashboard")}
          className="flex items-center justify-center p-2"
        >
          <ArrowLeft />
        </Button>
        <h1 className="flex-1 text-center text-xl font-bold">
          Your Booth for {formatDate(new Date(date))}
        </h1>
      </div>

      <div className="flex w-full max-w-7xl flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
        <div className="flex-1 rounded-2xl p-8 shadow-md">
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
                <div className="flex h-screen justify-center pt-20">
                  <CircleDashedIcon className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              )}
            </div>

            {selectedGood && (
              <div className="mb-4">
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

        <div className="flex-1 rounded-2xl p-2 shadow-md">
          <h2 className="mb-4 text-center text-xl font-bold">Goods Declared</h2>
          <GoodCardGroup weeklyBoothId={weeklyBoothId} />
        </div>
      </div>
    </div>
  );
};

export default VendorBoothForm;
