import axios from "axios";
import { InferType } from 'yup';
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import { logInStatus } from "../../atom/logInAtom";
import { userInfoState } from "../../atom/userAtom";
import { loginSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginService } from "../../services/authService";
import { saveLoginStatus } from "../../services/storeUserInfo";

//@dev: Login Form Data Type.
export type LoginFormData = InferType<typeof loginSchema>;

function LogIn(){
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const setUserInfo = useSetRecoilState(userInfoState);
    const setGlobalLoginStatus = useSetRecoilState(logInStatus);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
            resolver: yupResolver(loginSchema),
    });

    //@dev: Function to handle the form submission.
    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        let response: any;
        try {
            response = await loginService(data)
            if(response.status === 200){ 
                    setRedirect(true);
                    setUserInfo(response.data.data);     //@dev: Set user info to Recoil state.
                    saveLoginStatus();                   //@dev: Save user login to local storage.
                    setGlobalLoginStatus(true);          //@dev: Save login Status.
                    reset();
                    toast.success("LogIn Successful");
            }else{
                    toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    //@dev: After successful login, redirect the user to the home page.
    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-black shadow-white shadow-lg p-10 rounded-2xl">

            <h1 className="md:text-3xl text-xl font-bold text-green-400 mb-2">Welcome Back 👋</h1>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="">Email:</label>
                    <input
                        id="email"
                        disabled={isLoading}
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        {...register("email")}
                        className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                            {typeof errors.email?.message === "string" ? errors.email.message : ""}
                        </p>
                    )}
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Password:</label>
                    <input
                        id="password"
                        disabled={isLoading}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        {...register("password")}
                        className="shadow-lg p-2 rounded-lg bg-white text-black"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                            {typeof errors.password?.message === "string" ? errors.password.message : ""}
                        </p>
                    )}
                </div>
                
            </div>
        
            <Link to="/ForgotPassword" className="text-white underline hover:text-green-500">Forgot password?</Link>

            <button 
                type="submit"
                disabled={isLoading}
                className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-500 hover:cursor-pointer"
            >
                {isLoading ? 'Logging In...' : 'LogIn'}
            </button>
        </form>
    )
}

export default LogIn
