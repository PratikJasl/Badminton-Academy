import { Request, Response, NextFunction } from "express";
// import { locationSchema, planSchema, scheduleSchema  } from "../schema/coaching";
import { coachingSchema } from "../schema/coachingSchema";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/apiResponse";


//Validate the data for the location send from the client.
export async function locationDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        name,
        address
    } = req.body;

    try {
        if(!name || !address){
         res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
         return;
        }
        //Validate Location data against JOI Schema.
        const {error, value} = await coachingSchema.location.validateAsync(req.body);
        if(error){
            console.log(error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//Validate the data for the coaching plan send from the client.
export async function coachingPlanDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        name,
        description,
        planDuration,
        price
    } = req.body;

    try {
        if(!name || !description || !planDuration || !price){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
        const {error, value} = await coachingSchema.plan.validateAsync(req.body);
        if(error){
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//Validate the data for the coaching schedule send from the client.
export async function coachingScheduleDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        coachingBatch,
        coachingDays,
        coachingTime,
        coachingDuration
    } = req.body

    try {
        if(!coachingBatch || !coachingDays || !coachingTime || !coachingDuration){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        const {error, value} = await coachingSchema.schedule.validateAsync(req.body);

        if(error){
            console.log(error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}