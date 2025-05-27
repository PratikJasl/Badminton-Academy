import axios from "axios";
// import { SignUpFormData } from "../components/auth/SignUp";
import { LoginFormData } from "../components/auth/Login";
import { forgotPasswordData } from "../components/auth/Password";
import { verificationData } from "../components/auth/VerifyOtp";

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
        console.error("Error Logging In", error);
        throw error
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
        console.error("Error Signing Up", error);
        throw error;
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
        console.error("Error Logging Out", error);
        throw error;
    }
}

//@dev: Function for forgot password OTP generation.
export async function sendVerifyOtp(data: forgotPasswordData){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/send-reset-otp",
        data,
        {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error Logging In", error);
        throw error
    }
}

//@dev: Function for changing password.
export async function changePassword(data: verificationData){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/",
        data,
        {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error Logging In", error);
        throw error
    }
}