import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function getCochingScheduleByLocation(){
    try {
        let data= await prisma.coachingSchedule.findMany();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }  
}