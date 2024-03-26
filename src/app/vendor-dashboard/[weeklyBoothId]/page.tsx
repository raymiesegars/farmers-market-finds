<<<<<<< Updated upstream
// import { NextPage } from "next";
// import { fetchWeeklyBoothById } from "../../../actions/fetchWeeklyBoothById";
// import { WeeklyBooth } from "@prisma/client";
// import { useSearchParams } from "next/navigation";

// export const dynamic = 'force-dynamic'

// interface WeeklyBoothPageProps {
//   boothData: WeeklyBooth | null;
// }

// export async function setBoothData() {
  
//   const searchParams = useSearchParams();
//   console.log(searchParams);
//   if (!weeklyBoothId) {
//     return {
//       notFound: true,
//     };
//   }

//   const boothData = await fetchWeeklyBoothById(Number(weeklyBoothId));

//   return {
//     props: {
//       boothData: boothData || null,
//     },
//   };
// };

// const WeeklyBoothPage: NextPage<WeeklyBoothPageProps> = ({ boothData }) => {
  
//   if (!boothData) {
//     return <div>Booth not found</div>;
//   }

//   return (
//     <p>hi</p>
//     // <VendorBoothForm
//     //   date={boothData.date}
//     //   marketId={boothData.marketId}
//     //   weeklyBoothId={boothData.weeklyBoothId}
//     // />
//   );
// };



// export default WeeklyBoothPage;
=======
import { fetchWeeklyBoothById } from "../../../actions/fetchWeeklyBoothById";
import VendorBoothForm from "@/components/VendorBoothForm";

export default async function WeeklyBoothDetails({ params }: { params: { weeklyBoothId: string } }) {
  console.log(params)
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
>>>>>>> Stashed changes
