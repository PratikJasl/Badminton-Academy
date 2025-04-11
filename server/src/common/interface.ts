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

export interface existingLocationCheckResult {
    locationId: number;
}

export interface existingCoachingPlanCheckResult {
    coachingPlanId: number;
}