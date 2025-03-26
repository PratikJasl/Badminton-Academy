import { atom } from "recoil";

interface UserInfoType {
    fullName: string;
    gender: string;
    role: "student" | "coach" | "admin";
}
  
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});