export const USER_LOGIN_STATUS = 'user_login_status';

//@dev: Function to save data in Local Storage.
export function saveLoginStatus(){
      try {
        localStorage.setItem(USER_LOGIN_STATUS, JSON.stringify(true));
        console.log("User Logged In Status:", true);
      } catch (error) {
        console.error("Error saving user info to localStorage:", error);
      }  
}

//@dev: Function to remove data from the Local Storage.
export const clearLoginStatus = async () => {
  localStorage.removeItem(USER_LOGIN_STATUS);
}

//@dev: Function to initialize atom with local storage data.
export function getLoginStatus() {
    if (typeof window !== 'undefined') { // @dev: Ensure code runs only in browser
      try {
        const storedData = localStorage.getItem(USER_LOGIN_STATUS);
        if (storedData) {
          return JSON.parse(storedData);
        }
      } catch (error) {
        //@dev: If error remove old data form local storage.
        console.error("Error reading user info from localStorage:", error);
        localStorage.removeItem(USER_LOGIN_STATUS);
      }
    }
    return null;
};

