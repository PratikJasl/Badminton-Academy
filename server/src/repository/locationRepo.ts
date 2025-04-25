import { Location, PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { existingLocationCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to add new location.
export async function addNewLocation(name: string, address: string): Promise<Location | null>{
    try {
        let newLocation = await prisma.location.create({
            data:{
                name: name.trim(),
                address: address.trim()
            }
        })
        return newLocation;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev: Function to get all locatoins.
export async function getAllLocations(){
    try {
        let locations = await prisma.location.findMany({
            select: {
                locationId: true,
                name: true
            }
        });
        return locations;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}

//@dev: Function to check valid location.
export async function checkValidLocation(locationId: number): Promise<existingLocationCheckResult | null>{
    try {
        const validLocation = await prisma.location.findUnique({
            where:{locationId: locationId},
            select:{locationId: true}
        })
        return validLocation;
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}