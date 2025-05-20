import { getTodaysDate } from "../common/helperFunctions";
import { fetchAttendanceInterface, updateAttendanceInterface } from "../common/interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@dev: Function to fetch user attendance details from DB using location.
export async function getAllUserAttendanceByLocation(data: fetchAttendanceInterface){
    try {
            let attendanceData = await prisma.attendance.findMany({
                select:{
                    isStatus: true,
                    attendanceDate: true,
                    user:
                    {
                        select: {
                            userId: true,
                            fullName: true,
                        }
                    }
                },
                where: {
                    attendanceDate: data.attendanceDate,
                    user: {
                        locationId: data.locationId,
                        isKid: data.isKid
                    }
                }
            });
            console.log(attendanceData);
            return attendanceData;
        } catch (error) {
            console.log(error);
            throw(error);
        }
}


export async function updateUserPresenceByUserId_Attendance(scheduleId:number,data:updateAttendanceInterface[]){
    prisma.$transaction
    if(data.length===0 || scheduleId===null)
    {
        console.log("No data for update");
        return {count:0};
    }
    try {
        const updateAttendanceTransaction=data.map(item=>{
            const whereCondition={
                userId_attendanceDate:{
                    userId:item.userId,
                    attendanceDate:item.attendanceDate
                }
            };
        return prisma.attendance.update({
            where:whereCondition,
            data:{
                isStatus:item.isStatus,
                coachingScheduleId:scheduleId
            }
        })
        });

        const results=await prisma.$transaction(updateAttendanceTransaction);
        console.log(`Transaction Successful: Updated ${results.length} records `);
        return {count:results.length};
        
    } catch (error) {
        console.log("Attedance Update transaction failed: ",error);
        throw error;
        
        
    }
}


export async function insertUsersDataForAttendance(users:number[]) {
    const date=getTodaysDate();

    const newData=users.map(userId=>({
        userId:userId,
        attendanceDate:date
    }))
    try {
           const result=await prisma.attendance.createMany({
            data:newData
           })
    console.log("Data insertion for attendance successful.");
    
        
    }
     catch (error) {
        console.log("Data insertion for  attendance failed.");
        throw error
    }
    
}