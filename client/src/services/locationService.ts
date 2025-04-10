import axios from "axios";

//@dev Function to get location details.
export async function getLocation(){
    try {
        const response = await axios.get('http://localhost:3000/api/coachAdmin/location', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("Full response:", response.status);
        console.log("Data received:", response);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            return response.data.data; // Return the locations array
        } 
        else {
            console.error("Unexpected data structure from server.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching locations", error);
        return [];
    }
}