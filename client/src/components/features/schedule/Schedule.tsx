import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from "react";
import { deleteSchedule } from '../../../services/coachingScheduleService';
import { userInfoState } from "../../../atom/userAtom";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getCoachingSchedule } from '../../../services/coachingScheduleService';

interface ScheduleItem {
    coachingScheduleId: number;
    coachingBatch: string;
    coachingDays: string;
    startTime: string;
    endTime: string;
    locationId: number; // Added locationId based on your data structure
    location: { // Added specific type for the nested location object
        name: string;
        // Add other location fields if needed from your fetch
    };
    // Add other schedule fields if present
}

interface FilterLocation {
    locationId: number;
    name: string;
}

//@dev: Function to fetch all the locations.
function Schedule(){
    const [allSchedules, setAllSchedules] = useState<ScheduleItem[]>([]);
    const [filteredSchedules, setFilteredSchedules] = useState<ScheduleItem[]>([]);
    const [locationsForFilter, setLocationsForFilter] = useState<FilterLocation[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [isloading, setIsLoading ] = useState(false);
    const userInfo = useRecoilValue(userInfoState);
 
    const fetchSchedule = async() => {
        setIsLoading(true);
        try {
            let response: ScheduleItem[] = await getCoachingSchedule();
            setAllSchedules(response);
            setFilteredSchedules(response);

            const uniqueLocations = Array.from(
                new Map(response.map(item => [item.locationId, { locationId: item.locationId, name: item.location.name }]))
                .values()
            );
            setLocationsForFilter(uniqueLocations);
        } catch (error) {
            console.log("Error Fetching Schedule", error);
            toast.error("Failed to fetch Schedule. Please try again");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchSchedule();
    }, []);

    useEffect(() => {
        if (selectedLocationId === "") {
            setFilteredSchedules(allSchedules);
        } else {
            const locationIdNumber = parseInt(selectedLocationId, 10);
            const filtered = allSchedules.filter(
                schedule => schedule.locationId === locationIdNumber
            );
            setFilteredSchedules(filtered);
        }
    }, [allSchedules, selectedLocationId]);

    function convertDays(coachingDays: string): string {
        const days: { [key: string]: string } = {
            "1": "Monday",
            "2": "Tuesday",
            "3": "Wednesday",
            "4": "Thursday",
            "5": "Friday",
            "6": "Saturday",
            "7": "Sunday"
        };
        const convertedDayNames: string[] = [];

       for (let i = 0; i < coachingDays.length; i++) {
        const digit = coachingDays[i];
        if (days[digit]) {
            convertedDayNames.push(days[digit]);
        }
    }
        return convertedDayNames.join(", ");
    };

    const handleLocationFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocationId(event.target.value);
    };
  
    const handleDeleteSchedule = async (scheduleId: number) => {
        let response: any
        console.log("Schedule Id clicked is:", scheduleId);
        try {
            response = await deleteSchedule(scheduleId);
            if(response){
                if(response.status === 200){
                    toast.success("Schedule Deleted Successfully");
                    fetchSchedule();
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
        }
    };

    return(
        <section id="Schedule" className="">
                
            <div className="flex flex-col md:gap-3 gap-2 items-center text-center md:p-5 p-3 shadow-2xl shadow-gray-400 rounded-2xl lg:h-120 h-130 lg:w-200 w-74 md:mt-18 mt-10">
                <h2 className="text-3xl font-bold text-blue-600">Schedules</h2>

                <div className="">
                        <select
                            id="locationFilter"
                            value={selectedLocationId} // Controlled component
                            onChange={handleLocationFilterChange}
                            disabled={isloading || locationsForFilter.length === 0}
                            className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                            >
                            <option value="">All Locations</option>
                            {locationsForFilter.map((location) => (
                                <option key={location.locationId} value={location.locationId.toString()}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                </div>

                <div className="h-full overflow-auto space-y-4 scroll-smooth [scrollbar-width:none] border-white border-1 md:p-5 p-2 rounded-2xl lg:h-120 lg:w-190 w-68"> 
                    { isloading ? 
                        (<p className="lg:mt-28 mt-40">Loading Schedules...</p>

                        ) : (
                    filteredSchedules && filteredSchedules.length > 0 ? (
                        filteredSchedules.map((schedule) => (
                            <div 
                                key={schedule.coachingScheduleId} 
                                className="p-5 bg-gray-50 rounded-xl flex flex-col justify-center relative text-black"
                            >
                                <div className="flex flex-row gap-3 items-center text-start">
                                    <FlagIcon className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <p className="font-bold p-2">{schedule.coachingBatch}</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center text-start">
                                    <CalendarDaysIcon className="h-6 w-6 text-green-500" />
                                    <p className="p-2">{convertDays(schedule.coachingDays)}</p>
                                </div>
                                
                                <div className="flex flex-row gap-2 items-center text-start">
                                <MapPinIcon className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                                    <p className="p-2">{schedule.location.name}</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center text-start">
                                    <ClockIcon className="h-6 w-6 text-red-500" />
                                    <p className="p-2">{schedule.startTime} - {schedule.endTime}</p>
                                </div>

                                {userInfo?.role != "student" ?
                                (<TrashIcon 
                                    className="h-6 w-6 text-gray-500 right-1 absolute hover:scale-110 hover:text-red-600 hover:cursor-pointer" 
                                    onClick={() => handleDeleteSchedule(schedule.coachingScheduleId)}
                                />) : null}
                            </div>
                        ))
                    ) : (
                        <p className="lg:mt-28 mt-40">No schedule added</p>
                    ))}
                </div>

                {userInfo?.role != "student" ? 
                (<Link 
                    to="/AddSchedule"
                    className="text-blue-500 hover:text-white hover:cursor-pointer"
                > 
                    Add new schedule !!
                </Link>) : null}
            </div>  

        </section>
    )
}

export default Schedule
