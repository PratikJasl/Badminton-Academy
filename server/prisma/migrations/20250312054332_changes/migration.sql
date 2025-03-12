/*
  Warnings:

  - The `membershipStatus` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `CoachingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planDuration` to the `CoachingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coachingDuration` to the `CoachingSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'students', 'coaches');

-- CreateEnum
CREATE TYPE "membershipStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "CoachingPlan" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "planDuration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CoachingSchedule" ADD COLUMN     "coachingDuration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL,
DROP COLUMN "membershipStatus",
ADD COLUMN     "membershipStatus" "membershipStatus" NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE "UserLocation" (
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("userId","locationId")
);

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;
