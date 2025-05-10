import { Roles, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { gender, existingUserCheckResult, existingUserParams, userDataType } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to add new user.
export async function addNewUser(
    fullName :string,
    email :string, 
    phone :string,
    gender :gender, 
    dob :Date, 
    locationId :number, 
    coachingPlanId :number,
    hashedPassword :string, 
    planStartDate: Date,
    planEndDate: Date | null,
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
                planStartDate: planStartDate,
                planEndDate: planEndDate,
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

//@dev: Function to check existing user using email or userId.
export async function checkExistingUser(params: existingUserParams):Promise<existingUserCheckResult | null>{
    try {
        const { email, userId } = params;

        if(!email && !userId){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            return null;
        }

        //@dev: Determine which is available of the two parameters and query based on it.
        const existingUser = await prisma.user.findUnique({
            where: userId ? { userId: userId } : { email: email },
            select: {
                userId: true
            }
        });

        return existingUser;
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev: Function to find user and return user-object.
export async function getUserByEmail(email:string):Promise<User | null>{
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

//@dev: Function to fetch all users.
export async function getUsersById(userId: number){
    try {
            let user = await prisma.user.findUnique({
                where:{
                    userId: userId
                },
            })
            return user;
        } catch (error) {
            console.error(ERROR_MESSAGES.SERVER_ERROR, error);
            throw error
        }
}

//@dev: Function to update user details.
export async function updateUser(userId: number, userData: userDataType): Promise<userDataType>{
    try {
        const updateUserDetail = prisma.user.update({
            where: {
                userId: userId
            },
            data: userData,
            select: {
                fullName: true,
                email: true,
                phone: true,
                gender: true,
                dob: true,
                locationId: true,
                coachingPlanId: true,
                planStartDate: true
            }
        })
        return updateUserDetail;
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error
    }
}
