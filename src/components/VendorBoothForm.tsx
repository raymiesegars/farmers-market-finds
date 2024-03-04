import vendorFormSubmission from "@/actions/vendorFormSubmission";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import GlobalGoodsItem from "./GlobalGoodsItem";

interface VendorBoothFormProps {
  date: Date;
}

interface Good {
  id: number;
  name: string;
  type: string;
  image: string;
}

const VendorBoothForm = ({ date }: VendorBoothFormProps) => {
  const formattedDate = formatDate(new Date(date));
  const [goods, setGoods] = useState<Good[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("/api/globalGoods", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredGoods = goods.filter(good =>
    good.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inset-0 flex justify-center items-center p-4">
      <div className="p-8 rounded-2xl shadow-md max-w-2xl w-full">
        <div className="p-5">
          <h1 className="text-xl font-bold text-center mb-4">Your Booth for {formattedDate}</h1>
          <form action={vendorFormSubmission}>
            <div className="mb-4 pb-2">
              <label htmlFor="name" className="block text-sm font-medium">Search For Goods You Will Carry</label>
              <input
                type="text"
                id="search"
                name="vendor_name"
                className="mt-1 global-input block w-full rounded-md focus:ring focus:ring-opacity-50 p-2"
                placeholder="Search goods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-auto">
              {filteredGoods.map(good => (
                <GlobalGoodsItem key={good.id} good={good} />
              ))}

              {filteredGoods.length === 0 && (
                <p className="text-center py-5">No Goods Found</p>
              )}
            </div>

            <div className="mb-2 pt-2">
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <input
                type="text"
                id="price"
                name="vendor_price"
                className="mt-1 global-input block w-full rounded-md focus:ring focus:ring-opacity-50 p-2"
                placeholder="Enter price"
              />
            </div>

            <div className="mb-2 pt-2 pb-2">
              <label htmlFor="description" className="block text-sm font-medium">Item Description</label>
              <Textarea id="description" name="vendor_description" className="mt-1 global-input block w-full rounded-md focus:ring focus:ring-opacity-50 h-32" />
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                Add Good
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VendorBoothForm;