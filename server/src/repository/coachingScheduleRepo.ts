import { CoachingPlan, CoachingSchedule, PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { existingCoachingPlanCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to add new coaching schedule.
export async function addNewCoachingPlan(){

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
