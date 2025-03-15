/*
  Warnings:

  - You are about to drop the `UserLocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,coachingScheduleId,attendanceDate]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planEndDate` to the `CoachingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'pending');

-- DropForeignKey
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_userId_fkey";

-- DropIndex
DROP INDEX "User_fullName_key";

-- AlterTable
ALTER TABLE "CoachingPlan" ADD COLUMN     "planEndDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UserLocation";

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_coachingScheduleId_attendanceDate_key" ON "Attendance"("userId", "coachingScheduleId", "attendanceDate");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
