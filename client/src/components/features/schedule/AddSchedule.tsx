import axios from "axios";
import { InferType } from "yup";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { scheduleSchema } from "../../../schema/coachingSchema";
import { addSchedule } from "../../../services/coachingScheduleService";

//@dev: Location form data type.
export type ScheduleFormData = InferType<typeof scheduleSchema>

function AddSchedule(){
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm({
            resolver: yupResolver(scheduleSchema),
    });

    async function onSubmit(data: ScheduleFormData){
        setIsLoading(true);
        console.log("Schedule Data to send:", data);
        let response:any;
        try {
            response = await addSchedule(data);
            if(response){
                if(response.status === 201){
                    toast.success("Schedule Added Successfully");
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

    return(
        <section id="AddLocation" className="flex flex-col items-center">
            <div className="flex flex-col gap-3 p-5 items-center shadow-2xl shadow-gray-400 bg-gray-900 rounded-2xl">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2 ">Add new location</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-5 items-center">
                        <select 
                            id="coachingBatch"
                            {...register("coachingBatch")}
                            disabled={isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                        > 
                            <option>Kids_Standard</option>
                            <option>Kids_Premium</option>
                            <option>Adults_Standard</option>
                            <option>Adults_Premium</option>
                        </select>
                        {errors.coachingBatch && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.coachingBatch?.message === "string" ? errors.coachingBatch.message : ""}
                            </p>
                        )}

                        {/* code for week day selection */}
                        
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="shadow-lg p-2 min-w-64 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600 hover:cursor-pointer"
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>

                        <Link 
                            to="/Location" 
                            className="flex flex-row items-center text-blue-500 hover:text-white"
                        > 
                            <ArrowLeftIcon className="h-5 w-5" /> Back
                        </Link>
                    </form>
                </div>
        </section>
    )
}

export default AddSchedule