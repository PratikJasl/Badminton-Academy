import { PrismaClient, UserPlanInfo } from "@prisma/client";
import { addUserPlanInfoData} from "../common/interface";


const prisma =new PrismaClient();

export async function getAllActivePlansByUserId(userId:number):Promise<UserPlanInfo[]>{
            const userPlans=await prisma.userPlanInfo.findMany({
                where:{
                    userId:userId,
                    planStatus:true
                }
            })
    return userPlans;
        
}