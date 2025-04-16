import axios from "axios";
import { useForm } from "react-hook-form"
import { signUpSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import { getLocation } from "../../services/locationService";
import { getCoachingPlan } from "../../services/coachingPlanService";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { InferType } from 'yup';
import { signUpService } from "../../services/authService";

//@dev: Login Form Data Type.
export type SignUpFormData = InferType<typeof signUpSchema>;

function SignUp(){
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const [coachingPlan, setCoachingPlan] = useState<{coachingPlanId: number; name: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const today = new Date().toISOString().split('T')[0];
    
    //@dev: Function to fetch location and coaching Plan data.
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await getLocation();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        const fetchCoachingPlan = async () =>{
            try {
                const data = await getCoachingPlan();
                setCoachingPlan(data);
            } catch (error) {
                console.error("Error fetching Coaching Plans:", error);
            }
        }

        fetchLocation();
        fetchCoachingPlan();
    }, [])

    //@dev Function to register new user.
    const registerUser = async (data: SignUpFormData) => {
        setIsLoading(true);
        const { confirmPassword, ...dataToSend} = data;
        dataToSend.role = "student";
        let response: any;
        
        try {
            response = await signUpService(dataToSend);
           if(response.status == 201){
                setRedirect(true);
                toast.success("SignUp Successful");
           }else{
                toast.error(response.data.message);
           }  
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    if(redirect){
        return <Navigate to={'/Login'} />
    }

    return(
        <form onSubmit={handleSubmit(registerUser)} className="lg:w-full w-72 max-w-2xl max-h-screen mt-20 mb-10 lg:mt-10 lg:p-8 p-5 overflow-auto rounded-2xl shadow-lg shadow-white">
    
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center ">SignUp</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Column */}
                <div>
                    <div>
                        <input
                        id="fullName"
                        disabled={isLoading}
                        type="text"
                        autoComplete="fullName"
                        placeholder="Full Name"
                        {...register("fullName")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.fullName && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.fullName?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <input
                        id="email"
                        disabled={isLoading}
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.email && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.email?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <input
                        id="phone"
                        disabled={isLoading}
                        type="text"
                        autoComplete="phone"
                        placeholder="Phone Number"
                        {...register("phone")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.phone && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.phone?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <select
                        id="gender"
                        disabled={isLoading}
                        {...register("gender")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-gray-500"
                        >
                        <option value="">Select a Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.gender?.message}
                        </p>
                        )}
                    </div>
                </div>

                {/* Second Column */}
                <div>
                    <div className="mt-0 md:mt-0">
                        <input
                        id="dob"
                        disabled={isLoading}
                        type="text"
                        placeholder="Date of Birth"
                        onFocus={(e) => (e.target.type = "date")}
                        {...register("dob")}
                        max={today}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.dob && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.dob?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <select
                            id="locationId"
                            disabled={isLoading}
                            {...register("locationId")}
                            className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                            >
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                                <option key={location.locationId} value={location.locationId}>
                                {location.name}
                                </option>
                            ))}
                        </select>
                        {errors.locationId && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                                {errors.locationId?.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <select
                            id="coachingPlanId"
                            disabled={isLoading}
                            {...register("coachingPlanId")}
                            className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                            >
                            <option value="">Select a Coaching Plan</option>
                            {coachingPlan.map((coachingPlan) => (
                                <option
                                    key={coachingPlan.coachingPlanId}
                                    value={coachingPlan.coachingPlanId}
                                    >
                                    {coachingPlan.name}
                                </option>
                            ))}
                        </select>
                        {errors.coachingPlanId && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.coachingPlanId?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <input
                        id="password"
                        disabled={isLoading}
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.password && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.password?.message}
                        </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <input
                        id="confirmPassword"
                        disabled={isLoading}
                        type="password"
                        placeholder="Re-Enter Password"
                        {...register("confirmPassword")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.confirmPassword && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.confirmPassword?.message}
                        </p>
                        )}
                    </div>
                </div>      
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 shadow-lg p-3 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600 hover:cursor-pointer"
            >
                {isLoading ? 'Signing Up...' : 'SignUp'}
            </button>
        </form>
    )
}

export default SignUp
