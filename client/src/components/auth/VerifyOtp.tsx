import axios from "axios";
import { InferType } from "yup";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon} from "@heroicons/react/24/outline";
import { verificationSchema } from "../../schema/userSchema";
import { changePassword } from "../../services/authService";
import { useRecoilValue } from "recoil";
import { emailAtom } from "../../atom/emailAtom";

export type verificationData = InferType < typeof verificationSchema>

function VerifyOTP(){
    const [ isLoading, setIsLoading ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const email = useRecoilValue(emailAtom);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(verificationSchema),
    });

    async function onSubmit(data: verificationData){
        setIsLoading(true);
        console.log("Data Received from form:", data);
        console.log("Email In verify:", email);
        try {
            let response = await changePassword(data, email);
            if(response.status === 200){
                setRedirect(true);
                toast.success("Password Changed Successfully");
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
                            id="password"
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

                    <div className="text-blue-500">
                        <h3>If you didn't receive a code, resend</h3>
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
                    className="flex flex-row mt-1 items-center justify-center gap-1 text-green-500 hover:text-green-400"
                > 
                    <ArrowLeftIcon className="h-5 w-5" />Back
                </Link>
            </form>
        </>
    )
}

export default VerifyOTP