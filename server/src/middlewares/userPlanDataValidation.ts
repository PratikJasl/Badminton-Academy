import { Request,Response, NextFunction } from "express";
import { errorResponse } from "../common/apiResponse";
import { ERROR_MESSAGES } from "../common/messages";
import { coachingSchema } from "../schema/coachingSchema";

export async function userPlanDataValidation(req: Request,res: Response,next: NextFunction): Promise<void>{
    console.log("UserPlan data validation");
    const{userId, coachingPlanId, planStartDate, amount} = req.body;
    console.log("Recieved UserPlan Data: ",userId,coachingPlanId,planStartDate,amount);
  try {
      if(userId==null || coachingPlanId==null || planStartDate==null || amount==null)
      {
        console.log("ERROR: ",ERROR_MESSAGES.MISSING_FIELD);
        res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
        return;
      }
      const{error}=await coachingSchema.userPlan.validateAsync(req.body)
      next();
  } catch (error) {
    console.log("ERROR: ",error);
    res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    return;
    
  }
}
