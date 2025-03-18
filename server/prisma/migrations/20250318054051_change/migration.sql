/*
  Warnings:

  - The values [kids,adults] on the enum `coachingBatch` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "coachingBatch_new" AS ENUM ('kidsStandard', 'kidsPremium', 'adultsStandard', 'adultsPremium');
ALTER TABLE "CoachingSchedule" ALTER COLUMN "coachingBatch" TYPE "coachingBatch_new" USING ("coachingBatch"::text::"coachingBatch_new");
ALTER TYPE "coachingBatch" RENAME TO "coachingBatch_old";
ALTER TYPE "coachingBatch_new" RENAME TO "coachingBatch";
DROP TYPE "coachingBatch_old";
COMMIT;
