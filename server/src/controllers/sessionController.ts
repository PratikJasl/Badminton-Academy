import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";

const prisma = new PrismaClient();

export async function addLocation(req: Request, res: Response){
    const { name, address } = req.body;
    if(!name || !address){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return;
    }

    try {
        let newLocation = await prisma.location.create({
            data:{
                name: name,
                address: address
            }
        })

        res.status(200).json({success: "true", message: SUCCESS_MESSAGES.LOCATION_ADDED, detail: newLocation});
        return
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return;
    }
}