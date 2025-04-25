import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addNewLocation, checkValidLocation, getAllLocations } from "../repository/locationRepo";
import { addNewCoachingPlan, getAllCoachingPlan, getAllCoachingPlanName } from "../repository/coachingPlanRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";
import { getCochingScheduleByLocation } from "../service/attendanceService";
import { isValidCoachingSchedule } from "../service/ScheduleService";
import { isSchedulesDatesValid } from "../service/ScheduleService";
import { coachingScheduleInterface, scheduleResponseInterface } from "../common/interface";
import { addNewCoachingSchedule, getAllCoachingSchedule } from "../repository/coachingScheduleRepo";

const prisma = new PrismaClient();

//@dev: Add a new location to the database.
export async function addLocation(req: Request, res: Response): Promise<void>{
    console.log("------Add Location Route------");
    const { name, address } = req.body;
    try {
        let newLocation = await addNewLocation(name, address);
        if (!newLocation) {
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }
        res.status(201).json(successResponse(SUCCESS_MESSAGES.LOCATION_ADDED, newLocation));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}

//@dev: Add a new coaching plan to the database.
export async function addCoachingPlan(req: Request, res: Response): Promise<void>{
    console.log("------Add Coaching Plan Route------");
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
export async  function getAttendence(req:Request, res:Response): Promise<void> {
    
    try {
        let scheduleByLocation = await getCochingScheduleByLocation();
        res.status(200).json(successResponse(SUCCESS_MESSAGES.SCHEDULE_DATA_FETCHED, scheduleByLocation));

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));

    }




    // try {
    //     let locations= await getAllLocations()

    //     if(!locations){
    //     res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
    //     return;
    //     }
    //     res.status(200).json(successResponse(SUCCESS_MESSAGES.LOCATION_DATA_FETCHED,locations));
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    // }

}