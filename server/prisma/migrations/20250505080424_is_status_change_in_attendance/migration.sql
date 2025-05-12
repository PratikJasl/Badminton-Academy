/*
  Warnings:

  - The `isStatus` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "isStatus",
ADD COLUMN     "isStatus" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "AttendanceStatus";
