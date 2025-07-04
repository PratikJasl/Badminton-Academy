import { Request, Response, NextFunction } from "express";
import { coachingSchema  } from "../schema/coachingSchema";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/apiResponse";


//@dev: Validate the data for the location send from the client.
export async function locationDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------Location Data Validation------");
    const {
        name,
        address
    } = req.body;
    console.log("Received Req body:", req.body, name, address);
    try {
        if(!name || !address){
            console.log(ERROR_MESSAGES.MISSING_FIELD);
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
        //@dev: Validate Location data against JOI Schema.
        const {error, value} = await coachingSchema.location.validateAsync(req.body);
        if(error){
            console.log(ERROR_MESSAGES.VALIDATION_FAILED, error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();

    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Validate the data for the coaching plan send from the client.
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
            console.log(ERROR_MESSAGES.VALIDATION_FAILED, error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Validate the data for the coaching schedule send from the client.
export async function coachingScheduleDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        coachingBatch,
        coachingDays,
        startTime,
        endTime
    } = req.body

    try {
        if(!coachingBatch || !coachingDays || !startTime || !endTime){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
        
        const {error} = await coachingSchema.schedule.validateAsync(req.body);

        if(error){
            console.log(ERROR_MESSAGES.VALIDATION_FAILED, error);
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }

        next();
        
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}



