import axios from "axios";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { loginSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState} from "recoil";
import { userInfoState } from "../../atom/userAtom"


function LogIn(){
    const [redirect, setRedirect] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { register, handleSubmit, formState: {errors} } = useForm({
            resolver: yupResolver(loginSchema),
        });

    const onSubmit = async (data: any) => {
        let response;
        try {
            response = await axios.post("http://localhost:3000/api/auth/login",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
           if(response.status == 200){
                setRedirect(true);
                setUserInfo(response.data.data);
                alert("LogIn Successful");
                console.log("User Info stored is:",userInfo);
           }else{
                alert(response.data.message);
           }
          
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 lg:w-96 w-74 shadow-lg shadow-white p-10 rounded-2xl">

            <h1 className="text-3xl font-bold text-blue-600 mb-2 ">LogIn</h1>

            <div className="flex flex-col gap-5">
                <input
                    id="email"
                    type="email"
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
                    type="password"
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
                className="shadow-lg p-2 min-w-64 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600"
            >
                LogIn
            </button>
        </form>
    )
}

export default LogIn
