import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VendorBoothForm from "@/components/VendorBoothForm";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Market } from "../lib/marketTypes";

interface Props {
  market: Market;
}

const MarketActionButton = ({ market }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weeklyBoothId, setWeeklyBoothId] = useState<number | null>(null);

  const handleOpenDialog = async () => {
    setIsOpen(true);
    const response = await fetch(`/api/weeklyBoothId?date=${market.date}`);
    const data = await response.json();
    setWeeklyBoothId(data.weeklyBoothId);
  };
};
