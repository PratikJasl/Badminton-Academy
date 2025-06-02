/*
  Warnings:

  - You are about to drop the column `isPaymentDone` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `planEndDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `planStartDate` on the `User` table. All the data in the column will be lost.
  - The `membershipStatus` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlanInfo" DROP CONSTRAINT "UserPlanInfo_coachingPlanId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "isPaymentDone",
DROP COLUMN "userId",
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "planEndDate",
DROP COLUMN "planStartDate",
DROP COLUMN "membershipStatus",
ADD COLUMN     "membershipStatus" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "membershipStatus";

-- DropEnum
DROP TYPE "paymentStatus";
