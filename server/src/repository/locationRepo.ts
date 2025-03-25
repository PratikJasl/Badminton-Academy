import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();


export async function addNewLocation(name:String,address:String):Promise<String>{
    const  newLocation=await prisma.location.create({
        data:{
            name:name.trim(),
            address:address.trim()
        }
    })

    return newLocation.name;
}