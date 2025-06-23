/*
  Warnings:

  - Added the required column `target` to the `Pot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pot" ADD COLUMN     "target" DOUBLE PRECISION NOT NULL;
