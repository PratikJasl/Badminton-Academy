import { Request, Response } from "express";
import { checkExistingUser, getUserById, updateUser } from "../repository/userRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";
import { Prisma } from "@prisma/client";
import { UpdateUserRequestBody } from "../common/interface";
import { getCoachingPlanById } from "../repository/coachingPlanRepo";
import { getLocationById } from "../repository/locationRepo";

//@dev: Function to fetch user details by ID.
export async function getUserDetailById(req: Request, res: Response ): Promise<void>{
    console.log("-----User Details-----");
    const { userId } = req.body;
    try {
        //@dev: Check to ensure userID exists.
        if(!userId){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        //@dev: Get user details.
        let user = await getUserById(userId);
        if(!user) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }

        //@dev: Get coaching plan name.
        // let coachingPlan = await getCoachingPlanById(user.coachingPlanId);

        //@dev: Get Location name.
        let locationName = await getLocationById(user.locationId);

        //@dev: Construct the data to send.
        const data = {
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            role: user.role, 
            gender: user.gender, 
            locationName: locationName?.name,
            locationId: user.locationId,
            membershipStatus: user.membershipStatus
        };
        console.log("Data to send:", data);
        res.status(200).json(successResponse(SUCCESS_MESSAGES.USER_DATA_FETCHED, data));
        return;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Function to update user details by ID.
export async function updateUserDetail(req: Request, res: Response){
    console.log("-----Update User Details-----");
    const { userId, userData } = req.body as UpdateUserRequestBody;
    try {
        //@dev: Check to ensure userID and userData exists.
        if(!userId || !userData || typeof userId !== 'number' || typeof userData !== 'object'){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        //@dev: Check if user exists.
        let user = await checkExistingUser({userId: userId});
        if(!user){
            console.error(ERROR_MESSAGES.USER_NOT_FOUND);
            res.status(400).json(errorResponse(ERROR_MESSAGES.USER_NOT_FOUND));
            return;
        }

        //@dev: Update user data.
        let updatedUserDetails = await updateUser(userId, userData);
        res.status(200).json(successResponse(SUCCESS_MESSAGES.USER_DATA_UPDATED, updatedUserDetails));
        return;
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}
