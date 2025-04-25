import axios from "axios";
import { InferType } from "yup";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import DaySelectorCircles from "../WeekDaySelector"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getLocation } from "../../../services/locationService";
import { scheduleSchema } from "../../../schema/coachingSchema";
import { addSchedule } from "../../../services/coachingScheduleService";

//@dev: Location form data type.
export type ScheduleFormData = InferType<typeof scheduleSchema>

function AddSchedule(){
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<{locationId: number; name: string }[]>([]);
    const { register, handleSubmit, formState: {errors}, control, reset } = useForm({
            resolver: yupResolver(scheduleSchema),
    });
    
    //@dev: Function to handle submit.
    async function onSubmit(data: ScheduleFormData){
        setIsLoading(true);
        console.log("Schedule Data to send:", data);
        let response:any;
        try {
            response = await addSchedule(data);
            if(response){
                if(response.status === 201){
                    toast.success("Schedule Added Successfully");
                    reset();
                }else{
                    toast.error(response.data.message || "Failed, Please try again.");
                }
            }
        } catch (error) {
            console.log("Error occured is:",error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    //@dev: Function to generate time slots.
    const generateTimeSlots = (intervalMinutes: number): string[] => {
        const slots: string[] = [];
        const totalMinutesInDay = 24 * 60;
    
        for (let i = 0; i < totalMinutesInDay; i += intervalMinutes) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            // Pad hours and minutes with leading zero if less than 10
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(timeString);
        }
    
        return slots;
    };

    //@dev: Function to fetch location data.
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await getLocation();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocation();
    }, [])

    const timeSlots = generateTimeSlots(30);

    return(
        <section id="AddSchedule" className="">
            <div className="flex flex-col lg:gap-2 gap-1 items-center lg:w-full w-72 lg:max-h-135 max-h-130 max-w-2xl mt-20 lg:mb-1 mb-10 lg:mt-10 lg:p-8 p-5 overflow-auto shadow-lg shadow-whiteshadow-2xl shadow-gray-400 bg-gray-900 rounded-2xl">
                    <h1 className="lg:text-3xl text-2xl font-bold text-blue-600 mb-2 ">Add new Schedule</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* First column */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm">Choose Batch:</label>
                                    <select 
                                        id="coachingBatch"
                                        {...register("coachingBatch")}
                                        disabled={isLoading}
                                        className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                                    > 
                                        <option value="">Select a Batch</option>
                                        <option value="Kids_Standard">Kids_Standard</option>
                                        <option value="Kids_Premium">Kids_Premium</option>
                                        <option value="Adults_Standard">Adults_Standard</option>
                                        <option value="Adults_Premium">Adults_Premium</option>
                                    </select>
                                    {errors.coachingBatch && (
                                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                            {typeof errors.coachingBatch?.message === "string" ? errors.coachingBatch.message : ""}
                                        </p>
                                    )}
                                </div> 
                                
                                <div>
                                    <Controller
                                        name="coachingDays"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <DaySelectorCircles
                                                label="Choose Days:"
                                                field={field} // Pass field props (value, onChange, onBlur)
                                                fieldState={fieldState} // Pass fieldState (error, touched, etc.)
                                                disabled={isLoading}
                                            />
                                        )}
                                    />
                                    
                                </div>

                                <div>
                                    <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time:</label>
                                    <select
                                        id="startTime"
                                        {...register("startTime")}
                                        disabled={isLoading}
                                        className="shadow-lg p-2 rounded-lg bg-white text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Start Time</option> 
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                    {errors.startTime && (
                                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                                            {errors.startTime.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            {/* Second column */}
                            <div className="flex flex-col gap-4">
                                <div className="w-full">
                                    <label htmlFor="endTime" className="block text-sm font-medium mb-1">End Time:</label>
                                    <select
                                        id="endTime"
                                        {...register("endTime")} 
                                        disabled={isLoading}
                                        className="shadow-lg p-2 rounded-lg bg-white text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select End Time</option> 
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                    {errors.endTime && (
                                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                                            {errors.endTime.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="locationId" className="block text-sm font-medium mb-1">Choose Location:</label>
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
                            </div>
                        </div>
                                             
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="shadow-lg p-2 min-w-64 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600 hover:cursor-pointer"
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    <Link 
                        to="/Schedule" 
                        className="flex flex-row items-center text-blue-500 hover:text-white"
                    > 
                        <ArrowLeftIcon className="h-5 w-5" /> Back
                    </Link>
                </div>
        </section>
    )
}

export default AddSchedule