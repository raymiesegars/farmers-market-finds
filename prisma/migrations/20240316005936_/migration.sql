-- DropForeignKey
ALTER TABLE "VendorProfile" DROP CONSTRAINT "VendorProfile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBooth" DROP CONSTRAINT "WeeklyBooth_vendor_id_fkey";

-- AddForeignKey
ALTER TABLE "VendorProfile" ADD CONSTRAINT "VendorProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBooth" ADD CONSTRAINT "WeeklyBooth_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "VendorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
