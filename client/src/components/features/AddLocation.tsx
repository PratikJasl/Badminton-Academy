import { useEffect, useState } from "react";
import { getLocation } from "../../services/locationService";

function AddLocation(){
    const [locations, setLocations] = useState([]);

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
        
    },[locations]);

    return(
        <section id="addLocation" className="">

        </section>
    )
}

export default AddLocation