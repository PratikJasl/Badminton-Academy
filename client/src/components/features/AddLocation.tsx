import { useEffect, useState } from "react";
import { getLocation } from "../../services/locationService";

function AddLocation(){
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

    return(
        <section id="addLocation" className="">
            <div>
                {locations.map((location) => (
                    <div key={location.locationId}>
                        <p>{location.name}</p>
                        <p>{location.address}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AddLocation