import { Request, Response, NextFunction } from "express";
import { locationSchema } from "../schema/locationSchema";
import { ERROR_MESSAGES } from "../common/messages";

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