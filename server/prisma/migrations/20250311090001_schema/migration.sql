/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtpExpiredAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyOtpExpiredAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Coachingplans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Locations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coachingPlanId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_locationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_planId_fkey";

-- DropIndex
DROP INDEX "User_fullname_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "fullname",
DROP COLUMN "id",
DROP COLUMN "planId",
DROP COLUMN "resetOtp",
DROP COLUMN "resetOtpExpiredAt",
DROP COLUMN "verifyOtp",
DROP COLUMN "verifyOtpExpiredAt",
ADD COLUMN     "coachingPlanId" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "membershipStatus" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "otpResetCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "otpResetExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "otpVerificationCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "otpVerificationExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Coachingplans";

-- DropTable
DROP TABLE "Locations";

-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coachingScheduleId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "CoachingPlan" (
    "coachingPlanId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CoachingPlan_pkey" PRIMARY KEY ("coachingPlanId")
);

-- CreateTable
CREATE TABLE "CoachingSchedule" (
    "coachingScheduleId" SERIAL NOT NULL,
    "coachingDays" TEXT[],
    "coachingTime" TEXT NOT NULL,

    CONSTRAINT "CoachingSchedule_pkey" PRIMARY KEY ("coachingScheduleId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendanceId" SERIAL NOT NULL,
    "attendanceStatus" "AttendanceStatus" NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachingScheduleId" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendanceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_coachingScheduleId_key" ON "Location"("coachingScheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_fullName_key" ON "User"("fullName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachingPlanId_fkey" FOREIGN KEY ("coachingPlanId") REFERENCES "CoachingPlan"("coachingPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_coachingScheduleId_fkey" FOREIGN KEY ("coachingScheduleId") REFERENCES "CoachingSchedule"("coachingScheduleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_coachingScheduleId_fkey" FOREIGN KEY ("coachingScheduleId") REFERENCES "CoachingSchedule"("coachingScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;
