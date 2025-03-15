/*
  Warnings:

  - You are about to drop the column `coachingScheduleId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CoachingPlan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `CoachingSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `CoachingSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_coachingScheduleId_fkey";

-- DropIndex
DROP INDEX "Location_coachingScheduleId_key";

-- AlterTable
ALTER TABLE "CoachingSchedule" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "coachingScheduleId";

-- CreateIndex
CREATE UNIQUE INDEX "CoachingPlan_name_key" ON "CoachingPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoachingSchedule_locationId_key" ON "CoachingSchedule"("locationId");

-- AddForeignKey
ALTER TABLE "CoachingSchedule" ADD CONSTRAINT "CoachingSchedule_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;
