import { Request, Response, NextFunction } from "express";
import { locationSchema, coachingPlanSchema, coachingScheduleSchema  } from "../schema/sessionSchems";
import { ERROR_MESSAGES } from "../common/messages";

//Validate the data for the location send from the client.
export async function validateLocationData(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        name,
        address
    } = req.body;

    try {
        if(!name || !address){
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
            return;
        }

        const {error, value} = await locationSchema.validateAsync(req.body);

        if(error){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.VALIDATION_FAILED, details: error.details});
            return;
        }

        next();

    } catch (error) {
        res.status(500).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, details: error});
        return;
    }
}

//Validate the data for the coaching plan send from the client.
export async function validateCoachingPlanData(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        name,
        description,
        planDuration,
        price
    } = req.body;

    try {
        if(!name || !description || !planDuration || !price){
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
            return;
        }

        const {error, value} = await coachingPlanSchema.validateAsync(req.body);

        if(error){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.VALIDATION_FAILED, details: error.details});
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, details: error});
        return;
    }
}

//Validate the data for the coaching schedule send from the client.
export async function validateCoachingScheduleData(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        coachingDays,
        coachingTime,
        coachingDuration
    } = req.body

    try {
        if(!coachingDays || !coachingTime || !coachingDuration){
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
            return;
        }

        const {error, value} = await coachingScheduleSchema.validateAsync(req.body);

        if(error){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.VALIDATION_FAILED, details: error.details});
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, details: error});
        return;
    }
}