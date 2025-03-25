import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addNewLocation(name: string, address: string){
    let newLocation = await prisma.location.create({
        data:{
            name: name.trim(),
            address: address.trim()
        }
    })

    return newLocation;
}

export async function getAllLocationIds(){

    let locations = await prisma.location.findMany({
            select: {
            locationId: true,
            name: true
        }
    });
    console.log("locations fetched:", locations);
    return locations;
}