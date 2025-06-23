/*
  Warnings:

  - Added the required column `color` to the `Pot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pot" ADD COLUMN     "color" TEXT NOT NULL;
