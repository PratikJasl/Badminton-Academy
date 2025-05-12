import axios from "axios";
import { UpdateFormData } from "../components/features/user/UserDetails";

export async function getUserInfo() {
    try {
        const response = await axios.get('http://localhost:3000/api/user/data',{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      console.log("Full response:", response.status);
      console.log("Data received:", response);

      if (response.data && response.data.data){
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

export async function updateUserInfo(data: {userId: number, userData: UpdateFormData}){
    try {
        const response = await axios.put('http://localhost:3000/api/user/update',
            data,
           {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Error fetching locations", error);
        throw error;
    }
}