-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'student', 'coach');

-- CreateEnum
CREATE TYPE "membershipStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'pending');

-- CreateEnum
CREATE TYPE "coachingBatch" AS ENUM ('kidsStandard', 'kidsPremium', 'adultsStandard', 'adultsPremium');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "isKid" BOOLEAN NOT NULL DEFAULT false,
    "gender" "Gender",
    "locationId" INTEGER NOT NULL,
    "coachingPlanId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "planEndDate" TIMESTAMP(3),
    "planStartDate" TIMESTAMP(3),
    "membershipStatus" "membershipStatus" NOT NULL DEFAULT 'active',
    "otpVerificationCode" TEXT NOT NULL DEFAULT '',
    "otpVerificationExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpResetCode" TEXT NOT NULL DEFAULT '',
    "otpResetExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "CoachingPlan" (
    "coachingPlanId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "planDuration" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CoachingPlan_pkey" PRIMARY KEY ("coachingPlanId")
);

-- CreateTable
CREATE TABLE "CoachingSchedule" (
    "coachingScheduleId" SERIAL NOT NULL,
    "coachingBatch" "coachingBatch" NOT NULL,
    "coachingDays" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "CoachingSchedule_pkey" PRIMARY KEY ("coachingScheduleId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendanceId" SERIAL NOT NULL,
    "isStatus" "AttendanceStatus" NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "coachingScheduleId" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendanceId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "isPaymentDone" "paymentStatus" NOT NULL DEFAULT 'pending',
    "transactionDetails" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoachingPlan_name_key" ON "CoachingPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_coachingScheduleId_attendanceDate_key" ON "Attendance"("userId", "coachingScheduleId", "attendanceDate");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachingPlanId_fkey" FOREIGN KEY ("coachingPlanId") REFERENCES "CoachingPlan"("coachingPlanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingSchedule" ADD CONSTRAINT "CoachingSchedule_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_coachingScheduleId_fkey" FOREIGN KEY ("coachingScheduleId") REFERENCES "CoachingSchedule"("coachingScheduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
