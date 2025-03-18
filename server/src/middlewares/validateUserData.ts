import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schema/userSchema";
import { ERROR_MESSAGES } from "../common/messages";

export async function validateUserData(req: Request, res: Response, next: NextFunction): Promise<void>{
    const {
        fullName,
        dob,
        gender,
        email,
        phone,
        password,
        role,
        joinDate,
        locationId,
        coachingPlanId,
        planEndDate,
        planStartDate
    } = req.body;

    console.log(req.body);
    
    try {
        if(!fullName || !dob || !gender || !email || !phone || !password || !role || !joinDate || !locationId || !coachingPlanId || !planEndDate || !planStartDate){
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
            return
        }

        const {error, value} = await userSchema.validateAsync(req.body);

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