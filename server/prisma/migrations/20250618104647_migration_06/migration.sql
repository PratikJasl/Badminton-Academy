/*
  Warnings:

  - You are about to drop the column `userPlanInfoId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Payment_userPlanInfoId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "userPlanInfoId";
