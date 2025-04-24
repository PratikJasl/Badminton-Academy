// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link } from "react-router-dom";
import male from "../../../assets/male.png";
import person from "../../../assets/person.png";
import female from "../../../assets/female.png";
import { useRecoilValue } from 'recoil';
// import { useEffect, useState, useMemo } from "react";
// import { convertDays } from '../../../services/common';
import { userInfoState } from "../../../atom/userAtom";
// import { FlagIcon } from "@heroicons/react/24/outline";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { ClockIcon } from "@heroicons/react/24/outline";
// import { ScheduleItem } from '../../../services/common';
// import { MapPinIcon } from "@heroicons/react/24/outline";
// // import { FilterLocation } from '../../../services/common';
// import { CalendarDaysIcon } from "@heroicons/react/24/outline";
// import { deleteSchedule } from '../../../services/coachingScheduleService';
// import { getCoachingSchedule } from '../../../services/coachingScheduleService';

//@dev: Function to fetch all the Schedules.
function UserPlan(){
    // const [allSchedules, setAllSchedules] = useState<ScheduleItem[]>([]);
    // const [isloading, setIsLoading ] = useState(false);
    const userInfo = useRecoilValue(userInfoState);
    
    //@dev: Function to fetch all the schedules and update the states.
    // const fetchSchedule = async() => {
    //     setIsLoading(true);
    //     try {
    //         let response: ScheduleItem[] = await getCoachingSchedule();
    //         setAllSchedules(response);
    //     } catch (error) {
    //         console.log("Error Fetching Schedule", error);
    //         toast.error("Failed to fetch Schedule. Please try again");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // useEffect(()=>{
    //     fetchSchedule();
    // }, []);

    //@dev: Function to handle schedule deletion and update filter states.
    // const handleDeleteSchedule = async (scheduleId: number) => {
    //     let response: any
    //     try {
    //         response = await deleteSchedule(scheduleId);
    //         if(response){
    //             if(response.status === 200){
    //                 toast.success("Schedule Deleted Successfully");
    //                 setAllSchedules(prevSchedules => {
    //                     const newSchedules = prevSchedules.filter(schedule => schedule.coachingScheduleId !== scheduleId);
 
    //                     if (selectedLocationId !== "") {
    //                         const locationIdNumber = parseInt(selectedLocationId, 10);

    //                         if (!isNaN(locationIdNumber)) {
    //                             const remainingFilteredSchedules = newSchedules.filter(
    //                                 schedule => schedule.locationId === locationIdNumber
    //                             );
 
    //                             if (remainingFilteredSchedules.length === 0) {
    //                                 console.log(`Last schedule for location ${selectedLocationId} deleted. Resetting filter.`);
    //                                 setSelectedLocationId("");
    //                             }
    //                         } else {
    //                             console.warn(`Selected location ID is not a valid number: ${selectedLocationId}`);
    //                             setSelectedLocationId("");
    //                         }
    //                     }
    //                     return newSchedules;
    //                 });
    //             }else{
    //                 toast.error(response.data.message || "Failed, Please try again.");
    //             }
    //         }
    //     } catch (error) {
    //         console.log("Error occured is:",error);
    //         if (axios.isAxiosError(error) && error.response) {
    //             toast.error(error.response.data.message);
    //         } else {
    //             console.error("An unexpected error occurred:", error);
    //             toast.error("An unexpected error occurred. Please try again.");
    //         }
    //     }
    // };

    return(
        <section id="UserPlan" className="">
            <div className="flex flex-col md:gap-3 gap-2 items-center text-center md:p-5 p-3  rounded-2xl lg:h-130 h-130 lg:w-200 w-74 md:mt-18 mt-10">
            {userInfo === null ?
                null:
                <div 
                    className=""
                >
                    <div className="flex flex-col items-center justify-center p-4 gap-5">
                        <img
                            className="rounded-full lg:h-25 lg:w-20 h-18 w-15" 
                            src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                            alt="User">
                        </img>
                        {userInfo?.fullName && <h1>{userInfo.fullName}</h1>}

                        <div className="p-5 shadow-xl shadow-gray-400 rounded-2xl">
                            <h2 className="text-3xl font-bold text-blue-600">Plan</h2>
                            <h3>Plan Type:</h3>
                            <h3>Join Date:</h3>
                            <h3>Start Date:</h3>
                            <h3>Expiry Date:</h3>
                        </div>
                    </div>
                </div> 
                
            }
                
            </div>  
        </section>
    )
}

export default UserPlan
