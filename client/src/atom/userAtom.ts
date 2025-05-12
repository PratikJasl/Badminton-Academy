import { atom } from "recoil";

//@dev: Interface for User Info.
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

//@dev: Atom to store user information received from backend.
export const userInfoState = atom<UserInfoType | null>({
    key: "userInfoState",
    default: null,
});