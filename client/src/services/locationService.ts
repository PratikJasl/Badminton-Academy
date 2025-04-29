import axios from "axios";
import { LocationFormData } from "../components/features/location/AddLocation";

//@dev: Function to get location details.
export async function getLocation(){
    try {
        const response = await axios.get('http://localhost:3000/api/coach/location', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        // console.log("Full response:", response.status);
        // console.log("Data received:", response);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } 
        else {
            console.error("Unexpected data structure from server.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching locations", error);
        throw error;
    }
}

//@dev: Function to add new location.
export async function addLocation(data: LocationFormData){
    try {
        let response = await axios.post('http://localhost:3000/api/coach/add-location', data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        console.log("New Location Data received:", response);
        return response;
    } catch (error) {
        console.error("Error adding locations", error);
        throw error;
    }
}

//@dev: Function to delete location.
export async function deleteLocation(locationId: number){
    try {
        let response = await axios.post('http://localhost:3000/api/coach/delete-location', {locationId: locationId}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        console.log("Delete Location Data received:", response);
        return response;
    } catch (error) {
        console.error("Error adding locations", error);
        return null;
    }
}