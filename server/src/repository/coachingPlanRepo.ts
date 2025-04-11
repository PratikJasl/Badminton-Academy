import { CoachingPlan, PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { existingCoachingPlanCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to add new coaching plan.
export async function addNewCoachingPlan(
    name: string, 
    description: string,
    planDuration: string,
    price: number): Promise<CoachingPlan | null>{
    try {
        let newCoachingPlan = await prisma.coachingPlan.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                planDuration: planDuration.trim(),
                price: price
            }
        });
        return newCoachingPlan 
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev: Function to fetch all coaching plans.
export async function getAllCoachingPlan(): Promise<CoachingPlan[]| null>{
    try {
        let coachingPlans = await prisma.coachingPlan.findMany();
        return coachingPlans;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}

//@dev: Function to fetch all coahcing plan names.
export async function getAllCoachingPlanName(): Promise<{ coachingPlanId: number; name: string }[] | null> {
    try {
        let coachingPlanNames = await prisma.coachingPlan.findMany({
            select: {
            coachingPlanId: true,
            name: true
        }});  
        return coachingPlanNames;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}

//@dev: Function to check valid coaching plan.
export async function checkValidCoachingPlan(coachingPlanId: number): Promise< existingCoachingPlanCheckResult | null>{
    try {
        const validCoachingPlan = await prisma.coachingPlan.findUnique({
            where:{coachingPlanId: coachingPlanId},
            select:{coachingPlanId: true}
        })
        return validCoachingPlan;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}