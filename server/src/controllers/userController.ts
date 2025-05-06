import { Request, Response } from "express";
import { checkExistingUser, getUsersById, updateUser } from "../repository/userRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";
import { Prisma } from "@prisma/client";
import { UpdateUserRequestBody } from "../common/interface";

//@dev: Function to fetch user details by ID.
export async function getUserDetail(req: Request, res: Response ): Promise<void>{
    console.log("-----User Details-----");
    const { userId } = req.body;
    try {
        //@dev: Check to ensure userID exists.
        if(!userId){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        let user = await getUsersById(userId);
        if(!user) {
            res.status(204).json(successResponse(SUCCESS_MESSAGES.NO_DATA_FOUND));
            return;
        }

        console.log("Data to send:", user);
        res.status(200).json(successResponse(SUCCESS_MESSAGES.USER_DATA_FETCHED, user));
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
