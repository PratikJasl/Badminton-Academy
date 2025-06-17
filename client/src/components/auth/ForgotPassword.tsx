import axios from "axios";
import { InferType } from "yup";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon} from "@heroicons/react/24/outline";
import { emailVerificationSchema } from "../../schema/userSchema";
import { forgotPasswordEmailState } from "../../atom/emailAtom";
import { sendVerifyOtp } from "../../services/authService";
import { useSetRecoilState } from "recoil";

export type forgotPasswordData = InferType <typeof emailVerificationSchema>

function ForgotPassword(){
    const [ isLoading, setIsLoading ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    const emailFromRecoil = useSetRecoilState(forgotPasswordEmailState);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(emailVerificationSchema),
    });

    async function onSubmit(data: forgotPasswordData){
        setIsLoading(true);
        emailFromRecoil(data.email);
        console.log("Data Received from form:", data);
        try {
            let response = await sendVerifyOtp(data);
            console.log(response);
            if(response.status === 200){
                setRedirect(true);
                toast.success("OTP has been send");
                reset();
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
        }finally {
            setIsLoading(false);
        }
    }

    if(redirect){
        return <Navigate to={'/Verification'} />
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-black shadow-white shadow-lg p-10 rounded-2xl">
                <div>
                    <h1 className="md:text-3xl text-xl font-bold text-green-400 mb-2">Forgot Password</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Enter email address:</label>
                        <input 
                            type="email"
                            placeholder="example@gmail.com"
                            autoComplete="email"
                            {...register("email")}
                            disabled = {isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64 mb-1"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.email?.message === "string" ? errors.email.message : ""}
                            </p>
                        )}
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled = {isLoading}
                            className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-500 hover:cursor-pointer"
                        >
                            Send OTP
                        </button>
                    </div>
                </div>
                
                <Link 
                    to="/Login" 
                    className="flex flex-row items-center justify-center gap-1 text-white hover:text-green-500"
                > 
                    <ArrowLeftIcon className="h-5 w-5" />Back
                </Link>
            </form>
        </>
    )
}

export default ForgotPassword;