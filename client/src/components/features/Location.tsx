import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getLocation, deleteLocation } from "../../services/locationService";

//@dev: Function to fetch all the locations.
function Location(){
    const [locations, setLocations] = useState<{ locationId: string; name: string; address: string }[]>([]);

    const fetchLocation = async() => {
        try {
            let response = await getLocation();
            setLocations(response);
        } catch (error) {
            console.log("Error Fetching Location", error);
        }
    }

    useEffect(()=>{
        fetchLocation();
    }, []);

    const handleDeleteLocation = async (locationId: any) => {
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
        <section id="Location" className="flex md:flex-row md:gap-50 flex-col gap-10 items-center relative">
                
            <div className="flex flex-col gap-5 items-center text-center p-5 shadow-2xl shadow-gray-400 rounded-2xl h-110 lg:w-120 w-74">
                <h2 className="text-3xl font-bold text-blue-600 mb-2 ">Locations we serve</h2>

                <div className="h-full overflow-auto space-y-4 scroll-smooth [scrollbar-width:none] border-white border-1 md:p-5 p-2 rounded-2xl"> 
                    { locations.length > 0 ? (
                        locations.map((location) => (
                            <div 
                                key={location.locationId} 
                                className="p-5 bg-gray-50 rounded-xl flex flex-col justify-center relative text-black"
                            >
                                <div className="flex flex-row gap-3 items-center">
                                    <FlagIcon className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <p className="font-bold p-2">{location.name}</p>
                                </div>

                                <div className="flex flex-row gap-2 items-center">
                                    <MapPinIcon className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                                    <p className="p-2">{location.address}</p>
                                </div>

                                <TrashIcon 
                                    className="h-6 w-6 text-gray-500 right-1 absolute hover:scale-110 hover:text-red-600 hover:cursor-pointer" 
                                    onClick={() => handleDeleteLocation(location.locationId)}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="mt-28">No Locations added, add new location</p>
                    )}
                </div>

                <Link 
                    to="/AddLocation" 
                    className="text-blue-500 hover:text-white hover:cursor-pointer"
                > 
                    Add new location !!
                </Link>
            </div>  

        </section>
    )
}

export default Location