'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Markets, marketColumns } from "./markets-columns"
import { MarketsDataTable } from "./markets-data-table";
import { useRouter } from 'next/navigation';


//Edit description, 
//upload image,
//declare markets for the month out of a list of markets,
//declare what goods they will have at each booth in each market

export default function Dashboard() {
  const [goods, setGoods] = useState([])
  const [markets, setMarkets] = useState([])
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/isCurrentUserVendor')
      .then((res) => {
        if (!res.data) {
          // If there's no vendor_profile, redirect to vendor form
          router.push('/vendorform');
        }
      })
      .catch((error) => console.error(error));

    axios('/api/globalGoods').then((res: any) => {
      setGoods(res.data)
    })

    axios('/api/markets').then((res: any) => {
      setMarkets(res.data)
    })
  }, [router])

  return (
    <div>
      <div className='p-8 md:w-4/5 lg:w-3/5 mx-auto flex items-center justify-center'>
        <MarketsDataTable columns={marketColumns} data={markets} />
      </div>
    </div>
  )
}
