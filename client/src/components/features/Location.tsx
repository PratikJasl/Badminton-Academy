import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocation } from "../../services/locationService";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

//@dev: Function to fetch all the locations.
function Location(){
    const [locations, setLocations] = useState<{ locationId: string; name: string; address: string }[]>([]);

    useEffect(()=>{
        const fetchLocation = async() => {
            try {
                let response = await getLocation();
                setLocations(response);
            } catch (error) {
                console.log("Error Fetching Location", error);
            }
        }
        fetchLocation();
    }, []);

    const deleteLocation = async () => {

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
                                    onClick={deleteLocation}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No Locations added, Add new location</p>
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