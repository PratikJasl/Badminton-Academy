import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from "react";
import { userInfoState } from "../../../atom/userAtom";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getLocation, deleteLocation } from "../../../services/locationService";

//@dev: Function to fetch all the locations.
function Location(){
    const [locations, setLocations] = useState<{ locationId: number; name: string; address: string }[]>([]);
    const [isloading, setIsLoading ] = useState(false);
    const userInfo = useRecoilValue(userInfoState);
 
    const fetchLocation = async() => {
        setIsLoading(true);
        try {
            let response = await getLocation();
            setLocations(response);
        } catch (error) {
            console.log("Error Fetching Location", error);
            toast.error("Failed to fetch locations. Please try again");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchLocation();
    }, []);

    const handleDeleteLocation = async (locationId: number) => {
        let response: any
        console.log("Location Id clicked is:", locationId);
        try {
            response = await deleteLocation(locationId);
            if(response){
                if(response.status === 200){
                    toast.success("Location Deleted Successfully");
                    fetchLocation();
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
    }

    return(
        <section id="Location" className="">
                
            <div className="flex flex-col md:gap-5 gap-2 items-center text-center md:p-5 p-3 rounded-2xl lg:h-130 h-130 lg:w-200 w-74 md:mt-18 mt-10">
                <h2 className="text-3xl font-bold text-white mb-2 ">Locations we serve</h2>

                <div className="h-full overflow-auto space-y-4 scroll-smooth [scrollbar-width:none] border-white border-1 md:p-5 p-2 rounded-2xl lg:h-120 lg:w-190 w-68"> 
                    { isloading ? (<p className="lg:mt-35 mt-40">Loading loactions...</p>) : (
                    locations && locations.length > 0 ? (
                        locations.map((location) => (
                            <div 
                                key={location.locationId} 
                                className="p-5 bg-gray-50 rounded-xl flex flex-col justify-center relative text-black"
                            >
                                <div className="flex flex-row gap-3 items-center text-start">
                                    <FlagIcon className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <p className="font-bold p-2">{location.name}</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center text-start">
                                    <MapPinIcon className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                                    <p className="p-2">{location.address}</p>
                                </div>

                                {userInfo?.role != "student" ?
                                (<TrashIcon 
                                    className="h-7 w-7 text-gray-500 right-1 absolute hover:scale-110 hover:text-red-600 hover:cursor-pointer" 
                                    onClick={() => handleDeleteLocation(location.locationId)}
                                />) : null}
                            </div>
                        ))
                    ) : (
                        <p className="lg:mt-35 mt-40">No Locations added, add new location</p>
                    ))}
                </div>

                {userInfo?.role != "student" ? 
                (<Link 
                    to="/AddLocation" 
                    className="text-blue-500 hover:text-white hover:cursor-pointer"
                > 
                    Add new location !!
                </Link>) : null}
            </div>  

        </section>
    )
}

export default Location