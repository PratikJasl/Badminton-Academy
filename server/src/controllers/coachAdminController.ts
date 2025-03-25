import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";

const prisma = new PrismaClient();

//Add a new location to the database.
export async function addLocation(req: Request, res: Response){
    const { name, address } = req.body;
    
    if(!name || !address){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return;
    }

    try {
        let newLocation = await prisma.location.create({
            data:{
                name: name.trim(),
                address: address.trim()
            }
        })

        res.status(201).json({success: "true", message: SUCCESS_MESSAGES.LOCATION_ADDED, detail: newLocation});
        return
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
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

        res.status(201).json({success: "true", message: SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingPlan});
        return;
        
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
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

    if(!coachingBatch || !coachingDays || !coachingTime || !coachingDuration || !locationId){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return;
    }

    try {
        //Check if the location ID exists.
        let location = await prisma.location.findUnique({
            where: {locationId: locationId}
        })

        if (!location) {
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.INVALID_LOCATION_ID});
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

        res.status(201).json({success: "true", message: SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingSchedule});
        return;
        
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return;
    }
}

//Fetch locations from the database.
export async function getLocation(req: Request, res: Response){
    try {
        let locations = await prisma.location.findMany()

        if(!locations){
            res.status(400).json({status: "false", message: ERROR_MESSAGES.NO_DATA_FOUND});
            return;
        }

        res.status(200).json({data: locations, status: "true", message: SUCCESS_MESSAGES.LOCATION_DATA_FETCHED });
        return;
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return; 
    }
}

//Fetch coaching plans from the database.
export async function getCoachingPlan(req: Request, res: Response){
    try {
        let coachingPlan = await prisma.coachingPlan.findMany()

        if(!coachingPlan){
            res.status(400).json({status: "false", message: ERROR_MESSAGES.NO_DATA_FOUND});
            return;
        }

        res.status(200).json({data: coachingPlan, status: "true", message: SUCCESS_MESSAGES.PLAN_DATA_FETCHED });
        return;
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return; 
    }
}

//Fetch coaching schedule from the database.
export async function getCoachingSchedule(req: Request, res: Response){
    try {
        let coachingSchedule = await prisma.coachingSchedule.findMany()

        if(!coachingSchedule){
            res.status(400).json({ status: "false", message: ERROR_MESSAGES.NO_DATA_FOUND });
            return;
        }

        res.status(200).json({ data: coachingSchedule, status: "true", message: SUCCESS_MESSAGES.SCHEDULE_DATA_FETCHED });
        return;
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return; 
    }
}