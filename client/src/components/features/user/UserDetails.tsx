import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue } from 'recoil';
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema } from "../../../schema/userSchema";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { userInfoState } from "../../../atom/userAtom";

function updateUser(){

}

function UserDetails(){
    const userInfo = useRecoilValue(userInfoState);
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const [coachingPlan, setCoachingPlan] = useState<{coachingPlanId: number; name: string}[]>([]);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
            resolver: yupResolver(signUpSchema),
    });
    const today = new Date().toISOString().split('T')[0];

    // Populate form fields with userInfo data
    useEffect(() => {
        if (userInfo) {
            reset({
                fullName: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone,
                gender: userInfo.gender as "male" | "female" | "other",
                dob: userInfo.dob ? new Date(userInfo.dob) : undefined,
                // locationId: userInfo.locationId ?? null, // Handle undefined values
                // coachingPlanId: userInfo.coachingPlanId ?? null, // Handle undefined values
                planStartDate: userInfo.planStartDate ? new Date(userInfo.planStartDate) : undefined
            });
        }
    }, [userInfo, reset]);

    return(
        <form onSubmit={handleSubmit(UserDetails)} className="lg:w-full w-72 max-w-2xl max-h-screen mt-20 mb-5 lg:mt-15 lg:p-8 p-5 rounded-2xl bg-gray-900 border-1 border-sky-500  overflow-auto scroll-smooth [scrollbar-width:none]">
    
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center ">User Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Column */}
                <div>
                    <div className="flex flex-col gap-1">
                        <label>Full Name:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Email:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Phone No:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Gender:</label>
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
                    <div className="flex flex-col gap-1">
                            <label>Date Of Birth:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Location:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Coaching Plan:</label>
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

                    <div className="flex flex-col gap-1 mt-4">
                        <label>Plan Start Date:</label>
                        <input
                        id="planStartDate"
                        disabled={isLoading}
                        type="text"
                        placeholder="Plan Start Date"
                        onFocus={(e) => (e.target.type = "date")}
                        {...register("planStartDate")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                        />
                        {errors.dob && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.dob?.message}
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
                {isLoading ? 'Updating Details...' : 'Update Details'}
            </button>

            <Link 
                to="/UserPlan" 
                className="flex flex-row items-center text-blue-500 hover:text-white"
            > 
                <ArrowLeftIcon className="h-5 w-5" /> Back
            </Link>
        </form>
    )
}

export default UserDetails