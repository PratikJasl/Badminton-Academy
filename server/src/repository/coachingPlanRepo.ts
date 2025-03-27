import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addNewCoachingPlan(name: string, address: string){
    
}

export async function getAllCoachingPlanName(){
    let coachingPlans = await prisma.coachingPlan.findMany({
            select: {
            coachingPlanId: true,
            name: true
        }
    });
    console.log("Coaching Plans Fetched", coachingPlans);
    return coachingPlans;
}