import axios from "axios";

//@dev: Function to get location details.
export async function getAttendance(data: object){
    try {
        const response = await axios.post('http://localhost:3000/api/coach/attendance',
            data, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

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