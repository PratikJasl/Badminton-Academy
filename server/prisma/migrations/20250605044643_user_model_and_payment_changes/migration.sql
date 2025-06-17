-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "paymentStatus" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "UserPlanInfo" ADD CONSTRAINT "UserPlanInfo_coachingPlanId_fkey" FOREIGN KEY ("coachingPlanId") REFERENCES "CoachingPlan"("coachingPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;
