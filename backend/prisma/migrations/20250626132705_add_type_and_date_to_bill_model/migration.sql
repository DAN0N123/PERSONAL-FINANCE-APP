/*
  Warnings:

  - Added the required column `type` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('MONTHLY', 'ONETIME');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "dueDay" DOUBLE PRECISION,
ADD COLUMN     "dueExactDate" TIMESTAMP(3),
ADD COLUMN     "type" "BillType" NOT NULL;
