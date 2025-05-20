import { fetchAttendanceInterface, updateAttendanceInterface } from "../common/interface";
import { getAllUserAttendanceByLocation, updateUserPresenceByUserId_Attendance } from "../repository/attendanceRepo";

//@dev: Function to fetch user attendance details.
export async function getAllUsersAttendanceDetails(data:fetchAttendanceInterface) {
   try {
      const result = await getAllUserAttendanceByLocation(data);
      return result
   } catch (error) {
      throw error;
   }
}

//@dev: Function to update user attendance.
export async function updateUserAttendance(scheduleId:number,data:updateAttendanceInterface[]){
   try {
      const result =await updateUserPresenceByUserId_Attendance(scheduleId,data);
      return result;
   } catch (error) {
      throw error
   }
}