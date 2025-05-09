import { atom } from "recoil";
import { getLoginStatus } from "../services/storeUserInfo";

//@dev: Function to safely get initial status. 
//@dev: Handles case where getLoginStatus might not be immediately available or returns null.
const initializeLoginStatus = (): boolean => {
    try {
        const storedStatus = getLoginStatus(); 
        return !!storedStatus; // Converts true to true, null/undefined/false to false
    } catch (error) {
        console.error("Error initializing login status from localStorage:", error);
        return false;
    }
};

//@dev: Login status atom.
export const logInStatus = atom<boolean>({
    key: "logInStatus",
    default: initializeLoginStatus(), //@dev: Initialize default value from localStorage
});