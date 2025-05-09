import { Roles, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { gender, existingUserCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev Function to add new user.
export async function addNewUser(
    fullName :string,
    email :string, 
    phone :string,
    gender :gender, 
    dob :Date, 
    locationId :number, 
    coachingPlanId :number,
    hashedPassword :string, 
    role :Roles,
    isKid :boolean
): Promise<User>{
    try {
        const newUser = await prisma.user.create({
            data:{
                fullName: fullName,
                email: email,
                phone: phone,
                gender: gender,
                dob: dob,
                Location: {
                    connect: {locationId: locationId}
                },
                coachingPlan: {
                    connect: {coachingPlanId: coachingPlanId}
                },
                password: hashedPassword,
                role: role,
                isKid: isKid
            }
        });
        console.log("New user created");
        return newUser;  
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev Function to check existing user.
export async function checkExistingUser(email:string):Promise<existingUserCheckResult | null>{
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                email: email,
            },
            select:{
                userId: true
            }
        })
        return existingUser
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev Function to find user and return user-object.
export async function findUser(email:string):Promise<User | null>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: email
            },
        })
        return user
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}


export async function getAllActiveUserIds():Promise<number[]> {
    try {
        const users=await prisma.user.findMany({
            where:
            {membershipStatus:'active',
            },
            select:{
                userId:true,
            }
        })
        return users.map(user=>user.userId);
    } catch (error) {
        throw error
    }
    
}
