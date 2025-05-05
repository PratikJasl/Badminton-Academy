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

export interface fetchAttendanceInterface{
    locationId:number,
    isKid:boolean,
    attendanceDate:Date
}

export interface updateAttendanceInterface{
    userId:number,
    attendanceDate:Date,
    isStatus:boolean,
}