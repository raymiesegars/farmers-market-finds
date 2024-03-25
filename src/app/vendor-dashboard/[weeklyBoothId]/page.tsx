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
