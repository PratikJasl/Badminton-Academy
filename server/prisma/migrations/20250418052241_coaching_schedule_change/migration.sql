/*
  Warnings:

  - The values [kidsStandard,kidsPremium,adultsStandard,adultsPremium] on the enum `coachingBatch` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "coachingBatch_new" AS ENUM ('Kids_Standard', 'Kids_Premium', 'Adults_Standard', 'Adults_Premium');
ALTER TABLE "CoachingSchedule" ALTER COLUMN "coachingBatch" TYPE "coachingBatch_new" USING ("coachingBatch"::text::"coachingBatch_new");
ALTER TYPE "coachingBatch" RENAME TO "coachingBatch_old";
ALTER TYPE "coachingBatch_new" RENAME TO "coachingBatch";
DROP TYPE "coachingBatch_old";
COMMIT;
