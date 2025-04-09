import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schema/userSchema";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/apiResponse";

export async function userDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("User Data Validation Middleware")
    const {
        fullName,
        email,
        phone,
        dob,
        locationId,
        coachingPlanId,
        password,
        role,
    } = req.body;
    console.log(req.body); 
    
    try {
        if(!fullName || !dob  || !email || !phone || !password || !role || !locationId || !coachingPlanId){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return
        }
        const {error, value} = await userSchema.validateAsync(req.body);
        if(error){
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}