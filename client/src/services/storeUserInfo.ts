import { UserInfoType } from "../atom/userAtom";
export const USER_INFO_STORAGE_KEY = 'app_user_info';


// Function to save data in Local Storage.
export function saveUserInfo(userInfo: UserInfoType){
    if (userInfo) {
        try {
          localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
          console.log("User Info data stored");
        } catch (error) {
          console.error("Error saving user info to localStorage:", error);
        }
      } else {
        localStorage.removeItem(USER_INFO_STORAGE_KEY);
      }
}

// Function to remove data from the Local Storage.
export const clearUserInfo = async () => {
  localStorage.removeItem(USER_INFO_STORAGE_KEY);
}

//Function to initialize atom with local storage data.
export function getInitialUserInfo(){
    if (typeof window !== 'undefined') { // Ensure code runs only in browser
      try {
        const storedData = localStorage.getItem(USER_INFO_STORAGE_KEY);
        if (storedData) {
          return JSON.parse(storedData) as UserInfoType;
        }
      } catch (error) {
        //if error remove old data form local storage.
        console.error("Error reading user info from localStorage:", error);
        localStorage.removeItem(USER_INFO_STORAGE_KEY);
      }
    }
    return null;
};