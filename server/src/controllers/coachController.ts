import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { addNewLocation, checkValidLocation, getAllLocations, checkExistingLocation, removeLocation } from "../repository/locationRepo";
import { addNewCoachingPlan, getAllCoachingPlan, getAllCoachingPlanName } from "../repository/coachingPlanRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";
import { getAllUsersAttendanceDetails, updateUserAttendance } from "../service/attendanceService";
import { isValidCoachingSchedule } from "../service/ScheduleService";
import { isSchedulesDatesValid } from "../service/ScheduleService";
import { coachingScheduleInterface, fetchAttendanceInterface, scheduleResponseInterface, updateAttendanceInterface, userPlanData } from "../common/interface";
import { addNewCoachingSchedule, getAllCoachingSchedule, removeSchedule, ValidCoachingSchedule } from "../repository/coachingScheduleRepo";
import { addSchedularExecEntry, isSchedularTriggeredToday } from "../repository/schedularLogRepo";
import { checkSchedule } from "../tasks/attendanceDataInsertions";
import { getUserById } from "../repository/userRepo";
import { addUserPlanInfo } from "../service/userPlanService";
import { UserExceptions } from "../exceptions/userExceptions";
import { UserPlanExceptions } from "../exceptions/userPlanExceptions";

const prisma = new PrismaClient();

//@dev: Add a new location to the database.
export async function addLocation(req: Request, res: Response): Promise<void>{
    console.log("------Add Location Route------");
    const { name, address } = req.body;
    try {
        //@dev: Check if existing location.
        let existingLocation = await checkExistingLocation(name);
        if (existingLocation) {
            res.status(409).json(errorResponse(ERROR_MESSAGES.EXISTING_LOCATION));
            return;
        }

        //@dev: Add new location.
        let newLocation = await addNewLocation(name, address);
        if (!newLocation) {
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }
        res.status(201).json(successResponse(SUCCESS_MESSAGES.LOCATION_ADDED, newLocation));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}

//@dev: Add a new coaching plan to the database.
export async function addCoachingPlan(req: Request, res: Response): Promise<void>{
    
    const { name, 
            description, 
            planDuration, 
            price
        } = req.body;

    try {
        let newCoachingPlan = await addNewCoachingPlan(name, description, planDuration, price);
        res.status(201).json(successResponse(SUCCESS_MESSAGES.COACHING_PLAN_ADDED, newCoachingPlan));
        return;

    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Add a new coaching schedule to the database.
export async function addCoachingSchedule(req: Request, res: Response): Promise<void>{
    const {
        coachingBatch,
        coachingDays,
        startTime,
        endTime,
        locationId
    } = req.body;

    let data: coachingScheduleInterface = {
        coachingBatch: coachingBatch,
        coachingDays: coachingDays.trim(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        locationId: locationId
    }

    try {
        //@dev: Check if the location ID exists.
        let location = await checkValidLocation(locationId);
        if (!location) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return;
        }

        //@dev: Check if the schedule dates are valid.
        if(!isSchedulesDatesValid(data.coachingDays)){
            console.log(ERROR_MESSAGES.INVALID_DAYS);
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_DAYS));
            return;  
        }

        //@dev: Check if the schedule does not overlap with any existing schedule.
        const value: scheduleResponseInterface = await isValidCoachingSchedule(data);
        if (value.success) {
            console.log(value.message);
            res.status(400).json(errorResponse(value.message));
            return;
        }

        try {
            let newCoachingSchedule = await addNewCoachingSchedule(data);
            if(!newCoachingSchedule){ 
                res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
                return; 
            }
            res.status(201).json(successResponse(SUCCESS_MESSAGES.COACHING_PLAN_ADDED, newCoachingSchedule)); //Change Success message.
            return;
        } catch (error) {
            console.log("ERROR: error while persisting schedule data...", error);  
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Fetch locations from the database.
export async function getLocation(req: Request, res: Response): Promise<void> {
    try {
        let locations = await getAllLocations();
        if (!locations) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.LOCATION_DATA_FETCHED, locations));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Fetch coaching plans from the database.
export async function getCoachingPlan(req: Request, res: Response): Promise<void> {
    try {
        let coachingPlan = await getAllCoachingPlan();
        if (!coachingPlan) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.PLAN_DATA_FETCHED));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }

}

//@dev: Fetch coaching plan Names from the database.
export async function getCoachingPlanNames(req: Request, res: Response): Promise<void> {
    try {
        let coachingPlanNames = await getAllCoachingPlanName();
        if (!coachingPlanNames) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.PLAN_DATA_FETCHED, coachingPlanNames));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Fetch coaching schedule from the database.
export async function getCoachingSchedule(req: Request, res: Response): Promise<void> {
    try {
        let coachingSchedule = await getAllCoachingSchedule();
        if (!coachingSchedule) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.SCHEDULE_DATA_FETCHED, coachingSchedule));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Fetch user attendance.
export async function getAttendance(req:Request, res:Response): Promise<void> {
    const { locationId, isKid, attendanceDate } = req.body;

    let data : fetchAttendanceInterface = {
        locationId: locationId,
        isKid: isKid,
        attendanceDate: new Date(attendanceDate)// expected date formate (YYYY-MM-DD)
    }

    try {
        if(data.locationId === null){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
    
        //@dev: Check for valid locations.
        let validLocation = await checkValidLocation(locationId);
        if (!validLocation) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return;
        }

        //@dev: fetching usersData for Attendance
        try {
            if(await isSchedularTriggeredToday()){
                console.log("Controller: schedular triggered today.");     
            }
            else{
                try {
                    await checkSchedule("scheduledByController");
                    console.log("User Attendance data created with controller.");
                    await addSchedularExecEntry("scheduledByController");
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            }
            const userData = await getAllUsersAttendanceDetails(data);
            if(userData===null || userData.length===0){
                console.log("No Users Found");
                res.status(200).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND,userData));
                return;
            }
            else{
                res.status(200).json(successResponse(SUCCESS_MESSAGES.ATTENDANCE_DATA_FETCHED,userData));
                return;
            }
        } catch (error) {
            console.log("ERROR: Not able to fetch users data for attendence.");
            console.log(error);
            res.status(500).json(errorResponse(ERROR_MESSAGES.NOT_ABLE_TO_FETCH_USERS_ATTENDANCE_DATA));
            return;  
        }   
    } catch (error) {
       console.log("Error: Something went wrong! ");
       console.log(error);
       res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
       return;
    } 
}

//@dev: Update Attendance
//@dev: Type-Safety during runtime pending....zod
export async function updateAttendance(req:Request,res:Response): Promise<void>{
    const { userData  } = req.body;
    console.log("-----Update Attendance Route-----");
    console.log("Data received:", userData);
    let data: updateAttendanceInterface[] = [];

    try {
        if(!userData){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        userData.forEach((element: updateAttendanceInterface) => {
            let tempData = {
                userId: element.userId,
                attendanceDate: new Date(element.attendanceDate),
                isStatus: element.isStatus
            }
            data.push(tempData);
            console.log("Temp data created:",tempData);
        });
        
        try {
            const updatedData = await updateUserAttendance(data);
            if(updatedData === null){
                console.log("Try Again, Something went wrong...");
                res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
                return;
            }
            else{
                res.status(200).json(successResponse(SUCCESS_MESSAGES.UPDATE_SUCCESSFUL,updatedData));
                return;
            }
        } catch (error) {
            console.log("Updation Failed.... try Again.", error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.UPDATION_FAILED));
            return; 
        }
    } catch (error) {
        console.log("ERROR: Somethin went wrong",error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Delete Location.
export async function deleteLocation(req:Request, res: Response): Promise<void> {
    console.log("------Delete Location Route------");
    const { locationId } = req.body;

    try {
        if(!locationId){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
    
        //@dev: Check for valid locations.
        let validLocation = await checkValidLocation(locationId);
        if (!validLocation) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return;
        }
    
        //@dev: Delete location.
        let response = await removeLocation(locationId);
        if (!response) {
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.LOCATION_REMOVED, response));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}

//@dev: Delete Schedule.
export async function deleteSchedule(req:Request, res: Response): Promise<void> {
    console.log("------Delete Schedule Route------");
    const { scheduleId } = req.body;

    try {
        if(!scheduleId){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
    
        //@dev: Check for valid schedule.
        let validLocation = await ValidCoachingSchedule(scheduleId);
        if (!validLocation) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_COACHING_SCHEDULE_ID));
            return;
        }
    
        //@dev: Delete location.
        let response = await removeSchedule(scheduleId);
        if (!response) {
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.SCHEDULE_REMOVED, response));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}


export async function addUserPlan(req:Request,res:Response):Promise<void>{
    const{userId, coachingPlanId, planStartDate, amount} = req.body;

    let planData:userPlanData = {
        userId:userId,
        coachingPlanId:coachingPlanId,
        planStartDate:new Date(planStartDate),
        amount:amount
    }

    // console.log("---------",planData.planStartDate);
    
    try {         
        const paymentPlanData = await addUserPlanInfo(planData);
        console.log("Added data: ", paymentPlanData); 
        res.status(201).json(successResponse(SUCCESS_MESSAGES.USER_PLAN_DATA_CREATED));
        return;
    } 
    catch (error) {
        if(error instanceof UserExceptions){
            console.error("Catched: ",error.name);
            res.status(404).json(errorResponse(error.message));
            return;
        }
        else if(error instanceof UserPlanExceptions){
            console.error("ERROR: ",error.name);
            res.status(403).json(errorResponse(error.message));
            return;    
        }
        else{
            console.error("Else_Catch: ",error);
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, error));
            return;
        }
    }    
}

