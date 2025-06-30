import { addUserPlanInfoData, userPlanData } from "../common/interface";
import { UserExceptions } from "../exceptions/userExceptions";
import { UserPlanExceptions } from "../exceptions/userPlanExceptions";
import { getAllActivePlansByUserId } from "../repository/userPlanInfoRepo";
import { getUserById } from "../repository/userRepo";
import { getCoachingPlanById } from "../repository/coachingPlanRepo";
import { addPaymentAndUserPlanInfo } from "../repository/paymentRepo";
import { ERROR_MESSAGES } from "../common/messages";

// @raj: Add User Plan
export async function addUserPlanInfo(planData:userPlanData){
    try {
        const user = await getUserById(planData.userId);
        if(user === null){
            throw new UserExceptions({
                name:"USER_NOT_EXIST",
                message:ERROR_MESSAGES.USER_NOT_FOUND,
                cause:"user does not exists."
            })
        }
        else if(user.membershipStatus === false){
            throw new UserExceptions({
                name:"USER_INACTIVE",
                message:ERROR_MESSAGES.INACTIVE_USER,
                cause:"found user is not active."
            });
        }
        else if(user.isVerified === false){
            throw new UserExceptions({
                name:"USER_NOT_VERIFIED",
                message:ERROR_MESSAGES.USER_NOT_VERIFIED,
                cause:"found not verified user."
            });
        }

       

        const planDetails = await getCoachingPlanById(planData.coachingPlanId);
        if(planDetails==null){
            throw "no plans found!!!"
        }
        console.log("Plan_Details: ",planDetails);

        let activePlandetails:{isActivePlan:boolean,message:string}={
            isActivePlan:true,
            message:""
        };

        let calulatedEndDate:Date=new Date(Date.UTC(0,0,0,0));
        if(planDetails != null){
            calulatedEndDate = calculateEndDate(planDetails.planDuration, new Date(planData.planStartDate)); 
            activePlandetails = await checkActivePlan(planData.userId,planData.planStartDate,calulatedEndDate,planDetails.planDuration);
            console.log("activePlanDetails:---",activePlandetails.message);
            
        }
        if(activePlandetails.isActivePlan){
            throw new UserPlanExceptions({
                name:"ACTIVE_PLAN_EXISTS",
                message:activePlandetails.message,
                cause:"found already an active plan on the selected start date"
            });
        }
        if(calulatedEndDate<new Date(planData.planStartDate)){
            // to be continued...
            throw new UserPlanExceptions({
                name:"INVALID_PLAN_END_DATE",
                message:"Plan end date is less than plan start date",
                cause:"calculated planEnd date is less then than the given planStart date"
            });
        }
        console.log("End_DATE: ",calulatedEndDate);
        
        if(planDetails!= null){
            let currentUTCDate = getCurrentUTCDate();
            let newPlanObj:addUserPlanInfoData = {
                userId:planData.userId,
                coachingPlanId:planData.coachingPlanId,
                planStartDate:planData.planStartDate,
                planEndDate:calulatedEndDate,
                paymentDate:currentUTCDate,
                amount:planData.amount
            }
            const paymentPlanData = addPaymentAndUserPlanInfo(newPlanObj);
            return paymentPlanData;
        }
        else{
            console.error("ERROR: Plan details not found..");
            throw "Plan details not found..";
        }
    } catch (error) {
        throw error;  
    }
}


//@raj: check active plan
const checkActivePlan = async (userId:number, planStartDate:Date,planEndDate:Date,planDuration:number)
                                                    : Promise<{ isActivePlan: boolean, message: string }> => {
    const userPlans = await getAllActivePlansByUserId(userId);
    console.log("User Plans: ",userPlans);
    for(const element of userPlans){
        if(planStartDate<=element.planEndDate && planEndDate>=element.planStartDate){
            console.log("Active Plan found!!!");
            return {
                isActivePlan:true,
                message:`conflicted with active plan having start date and end date as ${element.planStartDate.toISOString()} to ${element.planEndDate.toISOString()}`
            }
        }
    }
    return {
        isActivePlan:false,
        message:"no active plan found..."
    };
}


//@raj: calculate end_date for plan termination.
const calculateEndDate = (planDuration: number, planStartDate: Date): Date => {
    if (planDuration <= 0) {
        throw new Error("Invalid Plan-Duration: Plan duration must be a positive number of months.");
    }

    let currentMonth = planStartDate.getMonth();
    let currentYear = planStartDate.getFullYear();
    let nextMonth = currentMonth + (planDuration-1);
    let endYear = currentYear + Math.floor(nextMonth/12);
    let endMonth = nextMonth % 12;
    let endDate = new Date(Date.UTC(endYear, endMonth+1, 0));
    endDate.setUTCHours(23, 59, 59, 999);
    return endDate;
}


const getCurrentUTCDate=()=>{
    let now = new Date();
    let currentUTCDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),0,0,0,0));
    return currentUTCDate;
}