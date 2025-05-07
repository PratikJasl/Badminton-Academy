import { atom } from "recoil";

export interface UserInfoType {
    userId: number;
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    role: "student" | "coach" | "admin";
    planStartDate: string;
    planEndDate: string;
    coachingPlanName: string;
    coachingPlanId: number;
    planDuration: string;
    locationName: string;
    locationId: number;
    membershipStatus: boolean
}
  
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});