import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addNewLocation, getAllLocations } from "../repository/locationRepo";
import { getAllCoachingPlanName } from "../repository/coachingPlanRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";


const prisma = new PrismaClient();

//Add a new location to the database.
export async function addLocation(req: Request, res: Response){
    const { name, address } = req.body;
    try {
        let newLocation = await addNewLocation(name, address);
        if(!newLocation){
             res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
             return;
        }
         res.status(201).json(successResponse(SUCCESS_MESSAGES.LOCATION_ADDED,newLocation));
         return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
        
    }
}

//Add a new coaching plan to the database.
export async function addCoachingPlan(req: Request, res: Response){
    const { name, 
            description, 
            planDuration, 
            price 
        } = req.body;

    if(!name || !description || !planDuration || !price){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return;
    }

    try {
        let newCoachingPlan = await prisma.coachingPlan.create({
            data:{
                name: name.trim(),
                description: description.trim(),
                planDuration: planDuration.trim(),
                price: price
            }
        })

        res.status(201).json(successResponse(SUCCESS_MESSAGES.COACHING_PLAN_ADDED,newCoachingPlan));
        return;
        
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }

}

//Add a new coaching schedule to the database.
export async function addCoachingSchedule(req: Request, res: Response){
    const {
        coachingBatch,
        coachingDays,
        coachingTime,
        coachingDuration,
        locationId
    } = req.body;

    try {
        //Check if the location ID exists.
        let location = await prisma.location.findUnique({
            where: {locationId: locationId}
        })
        if (!location) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return
        }

        //Add new coaching Schedule and link it with location-ID
        let newCoachingSchedule = await prisma.coachingSchedule.create({
            data:{
                coachingBatch: coachingBatch,
                coachingDays: coachingDays,
                coachingTime: coachingTime.trim(),
                coachingDuration: coachingDuration.trim(),
                location: {
                    connect: {locationId: locationId}
                }
            }
        })
        res.status(201).json(successResponse(SUCCESS_MESSAGES.COACHING_PLAN_ADDED,newCoachingSchedule));
        return;      
    } catch (error) {
        console.log(error);
        
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//Fetch locations from the database.
export async function getLocation(req: Request, res: Response){
    try {
        let locations = await getAllLocations();
        if(!locations){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.LOCATION_DATA_FETCHED,locations));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}


//Fetch coaching plans from the database.
export async function getCoachingPlan(req: Request, res: Response){

    try {
        let coachingPlan = await prisma.coachingPlan.findMany()
        if(!coachingPlan){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.PLAN_DATA_FETCHED));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }

}

//Fetch coaching plan Names from the database.
export async function getCoachingPlanNames(req: Request, res: Response){
    try {
        let coachingPlanNames = await getAllCoachingPlanName();
        if(!coachingPlanNames){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.PLAN_DATA_FETCHED,coachingPlanNames));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}

//Fetch coaching schedule from the database.
export async function getCoachingSchedule(req: Request, res: Response){
    try {
        let coachingSchedule = await prisma.coachingSchedule.findMany()

        if(!coachingSchedule){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }

        res.status(200).json(successResponse(SUCCESS_MESSAGES.SCHEDULE_DATA_FETCHED,coachingSchedule));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}


export async  function getAttendence(req:Request,res:Response){
    
    try {
        let locations= await getAllLocations()

        if(!locations){
        res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
        return;
        }
        res.status(200).json(successResponse(SUCCESS_MESSAGES.LOCATION_DATA_FETCHED,locations));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    }
    
}