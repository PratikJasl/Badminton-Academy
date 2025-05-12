import axios from "axios";

//@dev: Function to get coaching plan details.
export async function getCoachingPlan(){
    try {
        const response = await axios.get('http://localhost:3000/api/coach/coaching-plan-ids', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        // console.log("Full response:", response);
        // console.log("Data received:", response.data);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } 
        else {
            console.error("Unexpected data structure from server.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching Coaching Plan", error);
        throw error;
    }
}