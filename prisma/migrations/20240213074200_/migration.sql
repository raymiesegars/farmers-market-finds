/*
  Warnings:

  - Added the required column `date` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
