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
                name: name,
                address: address
            }
        })

        res.status(200).json({success: "true", message: SUCCESS_MESSAGES.LOCATION_ADDED, detail: newLocation});
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
                name: name,
                description: description,
                planDuration: planDuration,
                price: price
            }
        })

        res.status(200).json({success: "true", message: SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingPlan});
        return;
        
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return;
    }
}

//Add a new coaching schedule to the database.
export async function addCoachingSchedule(req: Request, res: Response){
    const {
        coachingDays,
        coachingTime,
        coachingDuration
    } = req.body;

    if(!coachingDays || !coachingTime || !coachingDuration){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return;
    }

    try {
        let newCoachingSchedule = await prisma.coachingSchedule.create({
            data:{
                coachingDays: coachingDays,
                coachingTime: coachingTime,
                coachingDuration: coachingDuration
            }
        })

        res.status(200).json({success: "true", message: SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingSchedule});
        return;
        
    } catch (error) {
        
    }
}