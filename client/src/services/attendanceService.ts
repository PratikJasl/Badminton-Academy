import axios from "axios";

//@dev: Function to get attendance details.
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

//@dev: Function to update attendance details.
export async function updateAttendance(data: object){
    try {
        console.log("Data received in service:", data);
        const response = await axios.put('http://localhost:3000/api/coach/updateAttendance',
            data, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        console.log("Response received is:", response);

        if (response.data && response.status === 200) {
            return true;
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