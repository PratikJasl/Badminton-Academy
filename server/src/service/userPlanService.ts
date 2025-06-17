
import { boolean } from "joi";
import { userPlanData } from "../common/interface";
import { UserExceptions } from "../exceptions/userExceptions";
import { UserPlanExceptions } from "../exceptions/userPlanExceptions";
import { getAllActivePlansByUserId } from "../repository/userPlanInfoRepo";
import { getUserById } from "../repository/userRepo";
import { getCoachingPlanById } from "../repository/coachingPlanRepo";



// @raj: check about the return type.
export async function addUserPlanInfo(planData:userPlanData){
    try {
        const user=await getUserById(planData.userId);
        if(user===null){
            throw new UserExceptions({
                name:"USER_NOT_EXIST",
                message:"User not found.",
                cause:"user does not exists."
            })
        }
        else if(user.membershipStatus===false){
            throw new UserExceptions({
                name:"USER_INACTIVE",
                message:"Inactive user",
                cause:"found user is not active."
            });
            
        }
        else if(user.isVerified===false){
            throw new UserExceptions({
                name:"USER_NOT_VERIFIED",
                message:"User not verified",
                cause:"found not verified user."
            });
        }
        //is plan active:
        const isPlanActive:boolean=await checkActivePlan(planData.userId,planData.planStartDate);
        if(isPlanActive){
            throw new UserPlanExceptions({
                name:"ACTIVE_PLAN_EXISTS",
                message:"Active plan on selected date",
                cause:"found already an active plan on the selected start date"
            });
        }

        const planDetails=await getCoachingPlanById(planData.coachingPlanId);
        console.log("Plan_Details: ",planDetails);
        if(planDetails!=null){
            calculateEndDate(planDetails.planDuration,new Date(planData.planStartDate));
        }
        else{
            console.error("ERROR: Plan details not found..");
            
        }
        

        // console.log("User fetched: ",user);
        return user;
    } catch (error) {
        throw error;  
    }
}


//@raj: check active plan
const checkActivePlan=async (userId:number,planStartDate:Date):Promise<boolean>=> {
    const userPlans=await getAllActivePlansByUserId(userId);
    console.log("User Plans: ",userPlans);
    for(const element of userPlans){
        console.log("checking plans",element.planEndDate);
        let date1=new Date(element.planEndDate);
        let date2=new Date(planStartDate); 
        if(date1>= date2){
            console.log("Active Plan......");
           return true;
        }
    }
    return false;
}


//@raj: calculate end_date for plan termination.
const calculateEndDate = (planDuration: number, planStartDate: Date): Date => {
    if (planDuration <= 0) {
        throw new Error("Invalid Plan-Duration: Plan duration must be a positive number of months.");
    }

    let currentMonth = planStartDate.getMonth();
    let currentYear = planStartDate.getFullYear();
    let targetMonth = currentMonth + (planDuration - 1);
    let endYear = currentYear + Math.floor(targetMonth / 12);
    let endMonth = targetMonth % 12;
    let endDate = new Date(Date.UTC(endYear, endMonth + 1, 0));
    endDate.setUTCHours(23, 59, 59, 999);
    return endDate;
}