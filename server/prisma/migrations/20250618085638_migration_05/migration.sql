/*
  Warnings:

  - The primary key for the `UserPlanInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userPlanId` on the `UserPlanInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPlanInfoId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentId]` on the table `UserPlanInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userPlanInfoId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "userPlanInfoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserPlanInfo" DROP CONSTRAINT "UserPlanInfo_pkey",
DROP COLUMN "userPlanId",
ADD COLUMN     "userPlanInfoId" SERIAL NOT NULL,
ADD CONSTRAINT "UserPlanInfo_pkey" PRIMARY KEY ("userPlanInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_userPlanInfoId_key" ON "Payment"("userPlanInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlanInfo_paymentId_key" ON "UserPlanInfo"("paymentId");
