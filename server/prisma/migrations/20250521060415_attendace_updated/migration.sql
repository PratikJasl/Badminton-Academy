/*
  Warnings:

  - You are about to drop the column `coachingScheduleId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `coachingPlanId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coachingPlanId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "coachingScheduleId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "coachingPlanId";

-- CreateTable
CREATE TABLE "UserPlanInfo" (
    "userPlanId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachingPlanId" INTEGER NOT NULL,
    "planStatus" BOOLEAN NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "planStartDate" TIMESTAMP(3) NOT NULL,
    "planEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlanInfo_pkey" PRIMARY KEY ("userPlanId")
);

-- AddForeignKey
ALTER TABLE "UserPlanInfo" ADD CONSTRAINT "UserPlanInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlanInfo" ADD CONSTRAINT "UserPlanInfo_coachingPlanId_fkey" FOREIGN KEY ("coachingPlanId") REFERENCES "CoachingPlan"("coachingPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;
