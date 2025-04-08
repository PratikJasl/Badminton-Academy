import { atom } from "recoil";

export interface UserInfoType {
    fullName: string;
    gender: string;
    role: "student" | "coach" | "admin";
}
  
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});