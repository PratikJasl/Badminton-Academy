import { UserInfoType } from "../atom/userAtom";
export const USER_LOGGED_IN = 'app_user_info';


//@dev: Function to save data in Local Storage.
export function saveUserInfo(){
      try {
        localStorage.setItem(USER_LOGGED_IN, JSON.stringify(true));
        console.log("User Logged In Status:", true);
      } catch (error) {
        console.error("Error saving user info to localStorage:", error);
      }  
}

//@dev: Function to remove data from the Local Storage.
export const clearUserInfo = async () => {
  localStorage.removeItem(USER_LOGGED_IN);
}

//@dev: Function to initialize atom with local storage data.
export function getInitialUserInfo() {
    if (typeof window !== 'undefined') { // @dev: Ensure code runs only in browser
      try {
        const storedData = localStorage.getItem(USER_LOGGED_IN);
        if (storedData) {
          return JSON.parse(storedData) as UserInfoType;
        }
      } catch (error) {
        //@dev: If error remove old data form local storage.
        console.error("Error reading user info from localStorage:", error);
        localStorage.removeItem(USER_LOGGED_IN);
      }
    }
    return null;
};

