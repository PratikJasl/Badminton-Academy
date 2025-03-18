/*
  Warnings:

  - You are about to drop the column `attendanceStatus` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpResetCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpResetExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerificationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpVerificationExpiry` on the `User` table. All the data in the column will be lost.
  - Added the required column `isStatus` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coachingBatch` to the `CoachingSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planEndDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planStartDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "coachingBatch" AS ENUM ('kids', 'adults');

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "attendanceStatus",
ADD COLUMN     "isStatus" "AttendanceStatus" NOT NULL;

-- AlterTable
ALTER TABLE "CoachingSchedule" ADD COLUMN     "coachingBatch" "coachingBatch" NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentStatus",
ADD COLUMN     "isPaymentDone" "paymentStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "transactionDetails" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "isVerified",
DROP COLUMN "otpResetCode",
DROP COLUMN "otpResetExpiry",
DROP COLUMN "otpVerificationCode",
DROP COLUMN "otpVerificationExpiry",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "planEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "planStartDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Authentication" (
    "otpVerificationCode" TEXT NOT NULL DEFAULT '',
    "otpVerificationExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpResetCode" TEXT NOT NULL DEFAULT '',
    "otpResetExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_userId_key" ON "Authentication"("userId");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
