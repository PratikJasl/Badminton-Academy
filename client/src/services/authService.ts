import axios from "axios";
// import { SignUpFormData } from "../components/auth/SignUp";
import { LoginFormData } from "../components/auth/Login";

//@dev: Function to login user.
export async function loginService(data: LoginFormData) {
    try {
        let response = await axios.post("http://localhost:3000/api/auth/login",
        data,
        {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.log("Error Logging In", error);
        return null;
    }
}

//@dev: Function to signup user.
export async function signUpService(dataToSend: any){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/signup",
            dataToSend,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          return response;
    } catch (error) {
        console.log("Error Signing Up", error);
        return null;
    }
}

//@dev: Function to logout user.
export async function logOutService(){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/logout", {}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.log("Error Logging Out", error);
        return null;
    }
}