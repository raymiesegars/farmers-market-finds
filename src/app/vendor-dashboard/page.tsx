'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalGoods, globalGoodsColumns } from "./global-goods-columns"
import { Markets, marketColumns } from "./markets-columns"
import { DataTable } from "./data-table";

//Edit description, 
//upload image,
//declare markets for the month out of a list of markets,
//declare what goods they will have at each booth in each market

export default function Dashboard() {
  const [goods, setGoods] = useState([])
  const [markets, setMarkets] =useState([])

  useEffect(() => {
    axios('/api/globalGoods').then((res: any) => {
      setGoods(res.data)
    })

    axios('/api/markets').then((res: any) => {
      setMarkets(res.data)
    }) 
  }, [])

  return (
    <div>

      
      <DataTable columns={marketColumns} data={markets} />
      <DataTable columns={globalGoodsColumns} data={goods} />
    </div>
  )
}
