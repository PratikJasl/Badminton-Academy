-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_coachingScheduleId_fkey";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "coachingScheduleId" DROP NOT NULL;
