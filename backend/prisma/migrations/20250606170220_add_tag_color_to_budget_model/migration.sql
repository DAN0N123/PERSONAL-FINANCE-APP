/*
  Warnings:

  - Added the required column `color` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "color" TEXT NOT NULL;
