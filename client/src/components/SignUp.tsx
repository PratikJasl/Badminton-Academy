import axios from "axios";
import { useForm } from "react-hook-form"
import { userSchema } from "../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import { getLocation } from "../services/locationService";
import { getCoachingPlan } from "../services/coachingPlanService";


function SignUp(){
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const [coachingPlan, setCoachingPlan] = useState<{coachingPlanId: number; name: string}[]>([]);

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            dob: undefined,
            locationId: undefined,
            coachingPlanId: undefined,
            password: '',
            confirmPassword: ''
        }
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
        console.log("control reached within onSubmit");
        console.log("Form data has been submitted:", data);

        // try {
        //     const response = await axios.post("http://localhost:3000/api/auth/signup",
        //     data,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       withCredentials: true,
        //     }
        //   );
        //   console.log("Signup successful:", response.data);
          
        // } catch (error) {
        //   if (axios.isAxiosError(error)) {
        //     console.error("Signup failed:", error.response?.data || error.message);
        //   } else {
        //     console.error("An unexpected error occurred:", error);
        //   }
        // }
    };

    return(
        <form onSubmit={handleSubmit(Register)} className="flex flex-col gap-3 lg:w-96 w-80 shadow-lg shadow-gray-600 p-10 m-5 rounded-2xl">

            <h1 className="text-3xl font-bold text-blue-600 ">SignUp</h1>

            <input 
                id="fullName" 
                type="text" 
                placeholder="Full Name" 
                {...register("fullName")}
                className="shadow-lg p-2 rounded-lg relative"
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
                className="shadow-lg p-2 rounded-lg"
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
                className="shadow-lg p-2 rounded-lg"
            />
            {errors.phone && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                {errors.phone?.message}
                </p>
            )}

            <input
                id="dob" 
                type="text"
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = 'date')}
                {...register('dob')}
                max={today}
                className="shadow-lg p-2 rounded-lg"
            />
            {errors.dob && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                    {errors.dob?.message}
                </p>
            )}

            <select 
                id="locationId" 
                {...register("locationId", {valueAsNumber: true})} 
                className="shadow-lg p-2 rounded-lg"
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
                {...register("coachingPlanId", {valueAsNumber: true})} 
                className="shadow-lg p-2 rounded-lg"
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
                className="shadow-lg p-2 rounded-lg"
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
                className="shadow-lg p-2 rounded-lg"
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
