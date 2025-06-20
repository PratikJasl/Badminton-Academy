import { PrismaClient } from "@prisma/client";
import { addUserPlanInfoData } from "../common/interface";
const prisma =new PrismaClient();

export async function addPaymentAndUserPlanInfo(newPlanObj:addUserPlanInfoData){
    try {
        const addedPaymentAndPlanData=await prisma.payment.create({
            data:{
                paymentDate:newPlanObj.paymentDate,
                paymentAmount:newPlanObj.amount,
                userPlanInfo:{
                    create:{
                        userId:newPlanObj.userId,
                        coachingPlanId:newPlanObj.coachingPlanId,
                        planStartDate:newPlanObj.planStartDate,
                        planEndDate:newPlanObj.planEndDate
                    }
                },
            },
            include:{userPlanInfo:true},
        });
        console.log("Payment and UserPlanInfo created: ",addPaymentAndUserPlanInfo);
        return addPaymentAndUserPlanInfo;
    } catch (error) {
        console.error('Error creating Payment and UserPlanInfo:', error);
        throw error;
    }
    finally{
        await prisma.$disconnect();
    }
}