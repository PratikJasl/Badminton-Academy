import { PrismaClient } from "@prisma/client";
import { getTodaysDate } from "../common/helperFunctions";

const prisma=new PrismaClient();

export async function isSchedularTriggeredToday():Promise<boolean> {
    try {
        const toadayDate=getTodaysDate();
        const result:number=await prisma.schedularLog.count({
            where:{
                executedDate:toadayDate
            }
        })
        console.log("Schedular_Result: ",result);
        if(result===0)
        {
            console.log("Not Triggered...")
            return false
        }
        console.log("Already Triggered...")
        return true;
    } catch (error) {
      console.log("Unable to fetch attendance schedular status. ");
      throw error;
        
    }
}

export async function addSchedularExecEntry(schedularName:string) {
    try {
        const result=await prisma.schedularLog.create({
            data:{
                schedularId:schedularName,
                executedDate:getTodaysDate()
            }
        });
        console.log("Schedular Execution Entry added");
        
        return result;
    } catch (error) {
        console.log("ERROR: Schedular execution entry failed...");
        throw error;
    }
}
