import axios from "axios";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { loginSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveUserInfo } from "../../services/storeUserInfo";
import { toast } from 'react-toastify';
import { InferType } from 'yup';

//@dev Login Form Data Type.
type LoginFormData = InferType<typeof loginSchema>;

function LogIn(){
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm({
            resolver: yupResolver(loginSchema),
    });

    //@dev Function to handle the form submission, and store user information in local storage.
    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        let response;
        try {
            response = await axios.post("http://localhost:3000/api/auth/login",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
           if(response.status === 200){
                setRedirect(true);
                saveUserInfo(response.data.data); //@dev Save user info to local storage.
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

    //@dev After successful login, redirect the user to the home page.
    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 lg:w-96 w-74 shadow-lg shadow-white p-10 rounded-2xl">

            <h1 className="text-3xl font-bold text-blue-600 mb-2 ">LogIn</h1>

            <div className="flex flex-col gap-5">
                <input
                    id="email"
                    disabled={isLoading}
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    {...register("email")}
                    className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                />
                {errors.email && (
                    <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                        {typeof errors.email?.message === "string" ? errors.email.message : ""}
                    </p>
                )}
            
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
           
            <a href="" className="text-blue-500 hover:text-white">forgot password?</a>

            <button 
                type="submit"
                disabled={isLoading}
                className="shadow-lg p-2 min-w-64 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600"
            >
                {isLoading ? 'Logging In...' : 'LogIn'}
            </button>
        </form>
        
    )
}

export default LogIn
