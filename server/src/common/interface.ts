import { coachingBatch } from "@prisma/client"

export interface coachingScheduleInterface{
    coachingBatch:coachingBatch,
    coachingDays:string,
    startTime:string,
    endTime:string,
    locationId:number
}

export interface scheduleResponseInterface{
    success:boolean,
    message:string
}

export type gender = "male" | "female" | "other";

export interface existingUserCheckResult {
    userId: number;
    fullName: string;
    otpResetCode: string;
    otpResetExpiry: Date;
    isVerified: boolean;
    otpVerificationCode: string,
    otpVerificationExpiry: Date
}

export interface validLocationCheckResult {
    locationId: number;
}

export interface existingLocationCheckResult {
    name: string;
}

export interface existingCoachingPlanCheckResult {
    coachingPlanId: number;
}

export interface existingScheduleCheckResult {
    coachingScheduleId: number;
}

export interface existingUserParams {
    email?: string;
    userId?: number;
}

export interface updateResetOtpParams {
    email: string;
    otp: string;
    otpExpiry: Date;
}

export interface updatePasswordParams {
    email: string;
    otpResetExpiry: Date;
    newPassword: string
}

export interface updateUserVerificationOtpParams {
    email: string;
    Otp: string;
    otpExpiry: Date;
}

export interface updateUserVerificationStatusParams {
    email: string;
    isVerified: boolean;
    otpVerificationCode: string;
    otpVerificationExpiry: Date;
}

export interface userDataType {
    fullName: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other' | null;
    dob: Date;
    locationId: number;
}

export interface UpdateUserRequestBody {
    userId?: number;
    userData?: userDataType;
}

export interface fetchAttendanceInterface{
    locationId:number,
    isKid:boolean,
    attendanceDate:Date
}

export interface updateAttendanceInterface{
    userId: number,
    attendanceDate: Date,
    isStatus: boolean,
}

export interface userPlanData{
    userId:number,
    coachingPlanId:number,
    planStartDate:Date,
    amount:number
}