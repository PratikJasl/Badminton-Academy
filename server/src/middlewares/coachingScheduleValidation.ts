import { PrismaClient } from "@prisma/client";
import { coachingScheduleInterface, scheduleResponseInterface } from "../common/interface";
import { DAYS_CODE } from "../common/daysCode";

const prisma=new PrismaClient();
export async function isValidCoachingSchedule(data:coachingScheduleInterface):Promise<scheduleResponseInterface>{

    const startTime:number=timeToMinutes(data.startTime);
    const endTime:number=timeToMinutes(data.endTime);
    if(startTime>endTime){
        return {
            success:true,
            message:"Start time is greater than end time"
        }
    }
         let existingSchedule=await prisma.coachingSchedule.findMany({
            where: ({locationId:data.locationId})
         })
    // console.log(" Schedule Data...",existingSchedule);
    // console.log("----------------------------------------")
    

   for(let i:number=0;i<existingSchedule.length;i++){
    if(startTime<timeToMinutes(existingSchedule[i].endTime) && endTime >timeToMinutes(existingSchedule[i].startTime)){

        const res=checkForDaysConflict(data.coachingDays,existingSchedule[i].coachingDays);
       if(res.success){
        return {
            success:true,
            message:`${DAYS_CODE[res.message as keyof typeof DAYS_CODE]} is conflicting`
        };
       }

    }   
   }
   const value:scheduleResponseInterface={
    success:false,
    message:"No schedule conflict found..."
   }
   return value;
}

function checkForDaysConflict(newCoachingDays:string,existingCoachingDays:string):scheduleResponseInterface{
    for(let i:number=0;i<newCoachingDays.length;i++){
        if(existingCoachingDays.includes(newCoachingDays[i])){
            return {
                success:true,
                message:newCoachingDays[i]
            }
        }
    }
    return {
        success:false,
        message:"No days conflicts found"
    }
}

function timeToMinutes(timeStr:string):number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }


export function isSchedulesDatesValid(newDays:string){
    const validDate:string=DAYS_CODE.VALID_DAYS;
    let seenDays:Set<string>=new Set();

    for(let i:number=0;i<newDays.length;i++){
            if(!validDate.includes(newDays[i])){
                return false;
            }
            if(seenDays.has(newDays[i])){
                return false;
            }
            seenDays.add(newDays[i]);
    }

    return true;
  }