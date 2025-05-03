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
    planName: string;
    planDuration: string;
    locationName: string;
    membershipStatus: boolean
}
  
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});