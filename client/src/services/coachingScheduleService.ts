import axios from "axios";
import { ScheduleFormData } from "../components/features/schedule/AddSchedule";

//@dev: Function to get coaching schedule details.
export async function getCoachingSchedule(){
    try {
        const response = await axios.get('http://localhost:3000/api/coach/coaching-schedule', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("Full response:", response);
        console.log("Data received:", response.data);

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

//@dev: Function to add new coaching schedule.
export async function addSchedule(data: ScheduleFormData){
    try {
        let response = await axios.post('http://localhost:3000/api/coach/add-coaching-schedule', data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        console.log("New Schedule Data received:", response);
        return response;
    } catch (error) {
        console.error("Error adding coaching schedule", error);
        throw error;
    }
}

//@dev: Function to delete schedule.
export async function deleteSchedule(scheduleId: number){
    try {
        let response = await axios.post('http://localhost:3000/api/coach/delete-coaching-schedule', {scheduleId: scheduleId}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        console.log("Delete schedule Data received:", response);
        return response;
    } catch (error) {
        console.error("Error deleting schedule", error);
        throw error;
    }
}