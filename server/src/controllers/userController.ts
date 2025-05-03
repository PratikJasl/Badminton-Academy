import { Request, Response } from "express";
import { getUsersById } from "../repository/userRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";

//@dev: Function to fetch user details by ID.
export async function getUserDetail(req: Request, res: Response ): Promise<void>{
    console.log("-----User Details-----");
    const { userId } = req.body;
    try {
        //@dev: Check to ensure userID exists.
        if(!userId){
            console.log(ERROR_MESSAGES.MISSING_FIELD);
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