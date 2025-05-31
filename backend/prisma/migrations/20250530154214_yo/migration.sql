/*
  Warnings:

  - You are about to drop the column `counterpartyName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Transaction` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Bill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAID', 'DUE', 'UPCOMING');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "status",
ADD COLUMN     "status" "BillStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "counterpartyName",
DROP COLUMN "userName";
