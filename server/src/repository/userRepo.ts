import { PrismaClient } from "@prisma/client";
import { Roles } from "@prisma/client";

const prisma = new PrismaClient();

export async function addNewUser(
    fullName :string,
    email :string, 
    phone :string, 
    dob :Date, 
    locationId :number, 
    coachingPlanId :number,
    hashedPassword :string, 
    role :Roles
){
    let newUser = await prisma.user.create({
        data:{
            fullName: fullName,
            email: email,
            phone: phone,
            dob: dob,
            Location: {
                connect: {locationId: locationId}
            },
            coachingPlan: {
                connect: {coachingPlanId: coachingPlanId}
            },
            password: hashedPassword,
            role: role,
        }
    });
    console.log("New user created");

    return newUser;
}

