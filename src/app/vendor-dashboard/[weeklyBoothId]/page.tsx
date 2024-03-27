import { fetchWeeklyBoothById } from "../../../actions/fetchWeeklyBoothById";
import VendorBoothForm from "@/components/VendorBoothForm";

export default async function WeeklyBoothDetails({ params }: { params: { weeklyBoothId: string } }) {
  const boothData = await fetchWeeklyBoothById(Number(params.weeklyBoothId));
  if (!boothData) {
    return <div>Booth not found</div>;
  }

  return (
    <VendorBoothForm
      date={boothData.market.date}
      marketId={boothData.market_id}
      weeklyBoothId={boothData.id}
    />
  );
}

