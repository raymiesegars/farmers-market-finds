-- AlterTable
ALTER TABLE "VendorProfile" ALTER COLUMN "vendor_image_path" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "weekly_booth_id" INTEGER NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyBooth" (
    "id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "market_id" INTEGER NOT NULL,

    CONSTRAINT "WeeklyBooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_weekly_booth_id_fkey" FOREIGN KEY ("weekly_booth_id") REFERENCES "WeeklyBooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBooth" ADD CONSTRAINT "WeeklyBooth_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "VendorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBooth" ADD CONSTRAINT "WeeklyBooth_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
