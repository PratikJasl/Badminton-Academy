import axios from "axios";
import { useForm } from "react-hook-form"
import { signUpSchema } from "../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import { getLocation } from "../services/locationService";
import { getCoachingPlan } from "../services/coachingPlanService";
import { Navigate } from "react-router-dom";


function SignUp(){
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const [coachingPlan, setCoachingPlan] = useState<{coachingPlanId: number; name: string}[]>([]);
    const [redirect, setRedirect] = useState(false);

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const today = new Date().toISOString().split('T')[0];

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

    const Register = async (data: any) => {
        const { confirmPassword, ...dataToSend} = data;
        dataToSend.role = "student";
        let response;
        try {
            response = await axios.post("http://localhost:3000/api/auth/signup",
            dataToSend,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
           if(response.status == 201){
                setRedirect(true);
                alert("SignUp Successful");
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
        return <Navigate to={'/Login'} />
    }
    return(
        <form onSubmit={handleSubmit(Register)} className="flex flex-col gap-3 lg:w-96 w-80 mt-20 shadow-lg shadow-white p-10 m-5 rounded-2xl">

            <h1 className="text-3xl font-bold text-blue-600 mb-2 ">SignUp</h1>

            <input 
                id="fullName" 
                type="text" 
                placeholder="Full Name" 
                {...register("fullName")}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            />
            {errors.fullName && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.fullName?.message}
                </p>
            )}
           

           <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            />
            {errors.email && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                {errors.email?.message}
                </p>
            )}

            <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                {...register("phone")}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            />
            {errors.phone && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                {errors.phone?.message}
                </p>
            )}

            <select 
                id="gender"
                {...register("gender")}
                className="shadow-lg p-2 rounded-lg bg-white text-gray-500"
            >
                <option value="">Select a Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.gender?.message}
                </p>
            )}

            <input
                id="dob" 
                type="text"
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = 'date')}
                {...register('dob')}
                max={today}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            />
            {errors.dob && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.dob?.message}
                </p>
            )}

            <select
                id="locationId"
                {...register("locationId")}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            >
                <option value="">Select a location</option>
                {locations.map((location) => (
                    <option key={location.locationId} value={location.locationId}>
                        {location.name}
                    </option>
                ))}
            </select>
            {errors.locationId && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.locationId?.message}
                </p>
            )}

            <select 
                id="coachingPlanId" 
                {...register("coachingPlanId")} 
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            >
                <option value="">Select a Coaching Plan</option>
                {coachingPlan.map((coachingPlan) =>(
                    <option key={coachingPlan.coachingPlanId} value={coachingPlan.coachingPlanId}>
                        {coachingPlan.name}
                    </option>
                ))}
            </select>
            {errors.coachingPlanId && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.coachingPlanId?.message}
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
                {errors.password?.message}
                </p>
            )}

            <input
                id="confirmPassword"
                type="password"
                placeholder="Re-Enter Password"
                {...register("confirmPassword")}
                className="shadow-lg p-2 rounded-lg bg-white text-black"
            />
            {errors.confirmPassword && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                {errors.confirmPassword?.message}
                </p>
            )}
            
            <button 
                type="submit"
                className="shadow-lg p-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    )
}

export default SignUp
