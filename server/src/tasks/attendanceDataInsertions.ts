
import { PrismaClient } from "@prisma/client";
import cron from "node-cron"
import { getTodaysDate } from "../common/helperFunctions";
import { addSchedularExecEntry, isSchedularTriggeredToday } from "../repository/schedularLogRepo";
import { getAllActiveUserIds } from "../repository/userRepo";
import { insertUsersDataForAttendance } from "../repository/attendanceRepo";

// 
const prisma = new PrismaClient();
let count = 0;
async function scheduledtask(): Promise<boolean> {
    console.log("I am scheduled task running at", Date.now());
    console.log("I am running at: ", count, " times.");

    
    try {
        let users = await getAllActiveUserIds();
        console.log("UserIds: ", users);
        console.log("Total No. of Users: ", users.length);
        const result = await insertUsersDataForAttendance(users);
        console.log("Task Executed successfully");
        return true;

    } catch (error) {
        console.log("something went wrong...", error)
        return false;
    }

}

export async function checkSchedule(schedularId: string):Promise<boolean> {
    console.log("ScheduleID: ",schedularId);
    
    try {
        if (await isSchedularTriggeredToday()) {
            return true;
        }
        else {
            console.log("Triggered schedule with scheduleId: ", schedularId);
            try {
                const result = await scheduledtask();
                try {
                    if (result) {
                        await addSchedularExecEntry(schedularId);
                    }
                } catch (error) {
                    console.log("SchedularLog Updation Failed.");
                    console.log(error);
                }
            } catch (error) {
                throw error;
            }

            return true;
        }

    }
    catch (error) {
        console.log("checkSchedule Failed: ", error);
        throw error
    }
}

export function taskSchedular() {
    cron.schedule("39 15 * * *", () => checkSchedule("schedule_1"),{
        scheduled:true,
        timezone:"Asia/Kolkata",
    });
}