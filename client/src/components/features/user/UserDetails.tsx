import { useRecoilValue } from 'recoil';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm, useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userInfoState } from "../../../atom/userAtom";
import { InferType } from "yup";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { userDetailSchema } from "../../../schema/userSchema";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getLocation } from "../../../services/locationService";
import { getCoachingPlan } from "../../../services/coachingPlanService";
import { formatDateToYYYYMMDD } from '../../../services/common';
import { updateUserInfo } from '../../../services/userService';
//import { saveUserInfo } from "../../../services/storeUserInfo";

//@dev: Update Form Data Type.
export type UpdateFormData = InferType<typeof userDetailSchema>;

function UserDetails(){
    const userInfo = useRecoilValue(userInfoState);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const [coachingPlan, setCoachingPlan] = useState<{coachingPlanId: number; name: string}[]>([]);
    const { register, handleSubmit, formState: {errors}, reset, control } = useForm({
            resolver: yupResolver(userDetailSchema),
    });
    const today = new Date().toISOString().split('T')[0];

    const { field: dobField } = useController({
        name: 'dob',
        control,
    });

    const { field: planStartDateField } = useController({
        name: 'planStartDate',
        control,
    });

    //@dev: Populate form fields with userInfo data.
    useEffect(() => {
        console.log("Data in User Deatils Atom:", userInfo);
        if (userInfo) {
            reset({
                fullName: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone,
                gender: userInfo.gender as "male" | "female" | "other",
                dob: userInfo.dob ? new Date(userInfo.dob) : undefined,
                locationId: userInfo.locationId ?? null, 
                coachingPlanId: userInfo.coachingPlanId ?? null,
                planStartDate: userInfo.planStartDate ? new Date(userInfo.planStartDate) : undefined
            });
        }
    }, [userInfo, reset, locations, coachingPlan]);

    //@dev: Fetch the locations and Coaching plans drop down.
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

    async function updateUser(data: UpdateFormData){
        setIsLoading(true);
        let response: any;
        const userId = userInfo?.userId;
        if (!userId) {
            toast.error("User ID is missing. Unable to update user details.");
            setIsLoading(false);
            return;
        }
        const userData = {...data}
        const dataToSend = { userId,  userData};

        try {
            response = await updateUserInfo(dataToSend);
            if(response.status === 200){
                console.log("User updated Response:",response)
                console.log("User updated Response object:",response.data.data)
                toast.success("User Data Updated Successfully");
                reset();
            }else{
                toast.error(response.data.message || "Failed, Please try again.");
            } 
        } catch (error) {
            console.error("Reached catch block:", error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit(updateUser)} className="lg:w-full w-72 max-w-2xl max-h-screen mt-20 mb-5 lg:mt-15 lg:p-8 p-5 rounded-2xl bg-gray-900 border-1 border-green-500  overflow-auto scroll-smooth [scrollbar-width:none]">
            <h1 className="text-3xl font-bold text-green-400 mb-6 text-center ">User Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Column */}
                <div>
                    <div className="flex flex-col gap-1">
                        <label>Full Name:</label>
                        <input
                        id="fullName"
                        disabled={isLoading || !isUpdate}
                        type="text"
                        autoComplete="fullName"
                        placeholder="Full Name"
                        {...register("fullName")}
                        className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                        disabled={isLoading || !isUpdate}
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        {...register("email")}
                        className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ?"bg-white" : "bg-gray-500"} text-black`}
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
                        disabled={isLoading || !isUpdate}
                        type="text"
                        autoComplete="phone"
                        placeholder="Phone Number"
                        {...register("phone")}
                        className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                        disabled={isLoading || !isUpdate}
                        {...register("gender")}
                        className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                                disabled={isLoading || !isUpdate}
                                type="text"
                                placeholder="Date of Birth"
                                value={dobField.value ? formatDateToYYYYMMDD(dobField.value) : ''}
                                onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value) : undefined;
                                    dobField.onChange(date);
                                }}
                                onBlur={dobField.onBlur} 
                                ref={dobField.ref}
                                onFocus={(e) => {
                                    e.target.type = "date"; 
                                }}
                                max={today}
                                className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                            disabled={isLoading || !isUpdate}
                            {...register("locationId")}
                            className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                            disabled={isLoading || !isUpdate}
                            {...register("coachingPlanId")}
                            className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
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
                            disabled={isLoading || !isUpdate}
                            type="text"
                            placeholder="Plan Start Date"
                            value={planStartDateField.value ? formatDateToYYYYMMDD(planStartDateField.value) : ''}
                            onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : undefined;
                                planStartDateField.onChange(date);
                            }}
                            onBlur={planStartDateField.onBlur} 
                            ref={planStartDateField.ref}
                            onFocus={(e) => {
                                e.target.type = "date";
                            }}
                            className={`w-full shadow-lg p-3 rounded-lg ${isUpdate ? 'bg-white' : 'bg-gray-500'} text-black`}
                        />
                        {errors.dob && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.dob?.message}
                        </p>
                        )}
                    </div>
                </div> 
            </div>

            <div>
                {
                    isUpdate ? (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 shadow-lg p-3 rounded-lg bg-green-700 text-white font-bold hover:bg-green-600 hover:cursor-pointer"
                        >
                            {isLoading ? 'Updating Details...' : 'Update Details'}
                        </button>
                    ) :
                    (<div
                        onClick={() => !isLoading && setIsUpdate(true)}
                        className={`flex flex-row justify-center gap-2 w-full mt-6 shadow-lg p-3 rounded-lg bg-green-700 text-white font-bold hover:bg-green-600 ${isLoading ? 'pointer-events-none opacity-50' : 'hover:cursor-pointer'}`}
                    >
                        <PencilSquareIcon className="h-6 w-6 text-white" /> Edit Details
                    </div>)
                }
            </div>
            
            <div className='flex justify-center mt-2'>
                <Link 
                    to="/UserPlan" 
                    className="flex flex-row items-center text-blue-500 hover:text-white"
                > 
                    <ArrowLeftIcon className="h-5 w-5" /> Back
                </Link>
            </div>
        </form>
    )
}

export default UserDetails