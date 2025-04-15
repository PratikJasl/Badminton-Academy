import { CoachingPlan, CoachingSchedule, PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { coachingScheduleInterface, existingCoachingPlanCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to add new coaching schedule.
export async function addNewCoachingSchedule(data: coachingScheduleInterface): Promise<CoachingSchedule | null>{
    try {
        let newCoachingSchedule = await prisma.coachingSchedule.create({
            data: {
                coachingBatch: data.coachingBatch,
                coachingDays: data.coachingDays,
                startTime: data.startTime,
                endTime: data.endTime,
                location: {
                    connect: { locationId: data.locationId }
                }
            }
        })
        return newCoachingSchedule;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev: Function to fetch all coaching schedules.
export async function getAllCoachingSchedule(): Promise<CoachingSchedule[]| null>{
    try {
        let coachingSchedules = await prisma.coachingSchedule.findMany();
        return coachingSchedules;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}

//@dev: Function to check existing coaching schedule.
export async function checkValidCoachingSchedule(locationId: number): Promise<CoachingSchedule[] | null>{
    try {
        const validCoachingSchedule = await prisma.coachingSchedule.findMany({
            where:{locationId: locationId},
        })
        return validCoachingSchedule;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}
