/*
  Warnings:

  - You are about to drop the column `name` on the `Good` table. All the data in the column will be lost.
  - You are about to drop the column `weekly_booth_id` on the `Good` table. All the data in the column will be lost.
  - Added the required column `global_good_id` to the `Good` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekly_booths_id` to the `Good` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Good" DROP CONSTRAINT "Good_weekly_booth_id_fkey";

-- AlterTable
ALTER TABLE "Good" DROP COLUMN "name",
DROP COLUMN "weekly_booth_id",
ADD COLUMN     "global_good_id" INTEGER NOT NULL,
ADD COLUMN     "weekly_booths_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GlobalGoods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "GlobalGoods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_weekly_booths_id_fkey" FOREIGN KEY ("weekly_booths_id") REFERENCES "WeeklyBooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_global_good_id_fkey" FOREIGN KEY ("global_good_id") REFERENCES "GlobalGoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
