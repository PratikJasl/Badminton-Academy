import { atom } from "recoil";

export interface UserInfoType {
    fullName: string;
    gender: string;
    role: "student" | "coach" | "admin";
    planStartDate: string;
    planEndDate: string;
    planName: string;
    planDuration: string;
    locationName: string;
}
  
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});