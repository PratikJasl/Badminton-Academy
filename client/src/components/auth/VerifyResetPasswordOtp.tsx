import axios from "axios";
import { InferType } from "yup";
import { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon} from "@heroicons/react/24/outline";
import { resetPasswordVerificationSchema } from "../../schema/userSchema";
import { forgotPasswordEmailState } from "../../atom/emailAtom";
import { changePassword } from "../../services/authService";
import { sendVerifyOtp } from "../../services/authService";
import { useRecoilValue } from "recoil";

export type verificationData = InferType < typeof resetPasswordVerificationSchema>

function VerifyResetPasswordOTP(){
    const [ isLoading, setIsLoading ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const [ isResending, setIsResending ] = useState(false);
    const [coolDownTimer, setCoolDownTimer] = useState(0);
    const emailFromRecoil = useRecoilValue(forgotPasswordEmailState);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(resetPasswordVerificationSchema),
    });

    //@dev: useEffect for handling the countdown logic
    useEffect(() => {
        if (coolDownTimer > 0) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            timerRef.current = setInterval(() => {
                setCoolDownTimer((prev) => prev - 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setIsResending(false); //@dev: Enable resend button when timer runs out
        }

        //@dev: Clean-up function
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [coolDownTimer]);

    useEffect(() => {
        if(!emailFromRecoil){
            toast.error("Your password reset session has expired or was interrupted. Please start over.");
            navigate("/ForgotPassword");
        }
    }, [emailFromRecoil, navigate]);

    async function sendOTP(){
        if (isResending) {
            return;
        }

        //const emailStr = localStorage.getItem("email");
        const emailStr = emailFromRecoil;
        const email = emailStr ? JSON.parse(emailStr) : null;
        if (!email) {
            toast.error("Email not found. Please go back to reset password.");
            setIsResending(false);
            setCoolDownTimer(0);
            return;
        }

        //@dev: Set isResending and coolDownTimer.
        setIsResending(true);
        setCoolDownTimer(30);

        try {
            let response = await sendVerifyOtp({email: email});
            if(response.status === 200){
                toast.success("OTP has been send");
            }else{
                toast.error(response.data.message || "OTP generation failed. Please try again.");
            }
        } catch (error) { 
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    async function onSubmit(data: verificationData){
        setIsLoading(true);
        const email = emailFromRecoil;
        //const email = emailStr ? JSON.parse(emailStr) : null;
        console.log("Email Received from recoil is:", email)
        console.log("Data Received from form:", data);
        console.log("Email In verify:", email);
        try {
            if (!email) {
                toast.error("Email not found. Please try the password reset process again.");
                setIsLoading(false);
                return;
            }
            let response = await changePassword(data, email);
            if(response.status === 200){
                setRedirect(true);
                toast.success("Password Changed Successfully");
                localStorage.removeItem("email");
                reset();
            }else{
                toast.error(response.data.message || "Password reset failed. Please try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }finally {
            setIsLoading(false);
        }
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }

    return(
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)}  
                className="flex flex-col items-center max-h-screen mt-20 mb-10 md:mt-10 md:p-10 p-5 overflow-auto rounded-2xl shadow-lg shadow-white"
            >
                <div>
                    <h1 className="md:text-3xl text-xl font-bold text-green-400 mb-2">Verification</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Enter New Password</label>
                        <input 
                            type="text"
                            placeholder="At least 6 digits"
                            id="password"
                            {...register("password")}
                            disabled = {isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64 mb-1"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.password?.message === "string" ? errors.password.message : ""}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Confirm Password</label>
                        <input 
                            type="text"
                            placeholder="******"
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            disabled = {isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64 mb-1"
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.confirmPassword?.message === "string" ? errors.confirmPassword.message : ""}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Enter verification Otp</label>
                        <input 
                            type="text"
                            placeholder="OTP"
                            id="otp"
                            {...register("otp")}
                            disabled = {isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64 mb-1"
                        />
                        {errors.otp && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.otp?.message === "string" ? errors.otp.message : ""}
                            </p>
                        )}
                    </div>

                    <div className="">
                        <h3>If you didn't receive a code,  
                            <a 
                                onClick={sendOTP} 
                                className={`
                                    text-green-500 p-1
                                    ${isResending ? 'cursor-not-allowed opacity-60' : 'hover:text-green-300 hover:cursor-pointer'}
                                `}
                            >
                                {isResending ? `resend (${coolDownTimer}s)` : 'resend'}
                            </a>
                        </h3>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled = {isLoading}
                            className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-500 hover:cursor-pointer"
                        >
                            Verify
                        </button>
                    </div>
                </div>
                
                <Link 
                    to="/Login" 
                    className="flex flex-row md:mt-2 mt-1 items-center justify-center gap-1 text-green-500 hover:text-green-300"
                > 
                    <ArrowLeftIcon className="h-5 w-5" />Back
                </Link>
            </form>
        </>
    )
}

export default VerifyResetPasswordOTP