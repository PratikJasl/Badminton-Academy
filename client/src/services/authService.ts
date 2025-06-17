import axios from "axios";
// import { SignUpFormData } from "../components/auth/SignUp";
import { LoginFormData } from "../components/auth/Login";
import { forgotPasswordData } from "../components/auth/ForgotPassword";
import { verificationData } from "../components/auth/VerifyResetPasswordOtp";
import { emailVerificationData } from "../components/auth/VerifyEmail";

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

export async function sendEmailVerificationOtp(data: emailVerificationData){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/verify-otp",
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
export async function changePassword(data: verificationData, email: string){
    try {
        let payload = {password: data.password, email: email, otp: data.otp};
        let response = await axios.post("http://localhost:3000/api/auth/reset-password",
        payload,
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

export async function verifyEmail(data: {email: string, otp: string}){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/verify-email",
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