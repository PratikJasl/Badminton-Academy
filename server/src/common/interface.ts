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

