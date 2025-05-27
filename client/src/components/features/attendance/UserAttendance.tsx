import { useState, useEffect } from "react";
import { getLocation } from "../../../services/locationService";
import { getAttendance, updateAttendance } from "../../../services/attendanceService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AttendanceItem } from "../../../services/common";
import { toast } from "react-toastify";

function UserAttendance(){
    //const [ isloading, setIsLoading ] = useState(false);
    const [ locations, setLocations ] = useState<{locationId: number; name: string }[]>([]);
    const [ attendanceData, setAttendanceData ] = useState<AttendanceItem[]>([]);
    const [ selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [ selectedBatch, setSelectedBatch ] = useState<string>("");
    const [ selectedDate, setSelectedDate ] = useState<string>("");

    //@dev: Function to fetch location on page load.
    useEffect(()=>{
        const fetchLocation = async () => {
            try {
                const data = await getLocation();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocation();
    }, [])

    //@dev: Function to handle attendance search.
    async function handleSearch(){
        // console.log(selectedLocationId, selectedBatch, selectedDate);
        const data = { locationId: parseInt(selectedLocationId), isKid: determineBatch(selectedBatch), attendanceDate: selectedDate};
        try {
            // console.log("Data to send:", data);
            const response = await getAttendance(data);
            console.log(response);
            setAttendanceData(response);
            console.log("Data Inside attendance state:", attendanceData);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    }

    //@dev: Function to determine isKids variable.
    function determineBatch(selectedBatch: string){
        if(selectedBatch == 'Kids'){
            return true
        }else{
            return false
        }
    }

    //@dev: Function to handle attendance status change.
    const handleAttendanceChange = (userId: number, newStatus: boolean) => {
        setAttendanceData(prevAttendanceData =>
            prevAttendanceData.map(item =>
                item.user.userId === userId ? { ...item, isStatus: newStatus } : item
            )
        );
    };

    //@dev: Function to handle attendance data updation.
    async function handleSubmit(){
        try {
            let temp:Array<Object> = [];
            if(attendanceData){
                attendanceData.forEach((element) => {
                    temp.push({userId: element.user.userId, attendanceDate: element.attendanceDate, isStatus: element.isStatus});
                })
            }
            const data = { userData: temp }
            console.log("Data to be sent is:", data);
            const response = await updateAttendance(data);
            if(response){
                console.log("Attendance updated successfully");
                toast.success("Attendance updated successfully");
            }
        } catch (error) {
            console.error("Error Updating attendance:", error);
        }
    }

    return(
        <section id="attendance" className="">
            <div className="flex flex-col md:gap-3 gap-2 items-center text-center md:p-5 p-3 rounded-2xl lg:h-130 h-130 lg:w-200 w-74 md:mt-10 mt-1 md:mb-10 mb-5">
                <h2 className="text-3xl font-bold">Attendance</h2>

                <div className="flex md:flex-row flex-col md:gap-20 gap-2 mx-5 justify-between">
                    <div className="flex md:flex-col flex-row justify-center md:gap-5 gap-2 md:p-5 p-2 border-white border-1 rounded-2xl">
                        <select
                            id="locationFilter"
                            className="md:w-full w-28 md:p-3 p-1 rounded-lg bg-white text-black"
                            value={selectedLocationId}
                            onChange={(e) => setSelectedLocationId(e.target.value)}
                        >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option key={location.locationId} value={location.locationId}>
                                    {location.name}
                                </option>
                            ))}
                        </select>

                        <select
                            id="kidsFilter"
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            className="md:w-full w-15 md:p-3 p-1 rounded-lg bg-white text-black"
                            >
                            <option value="">Select Batch</option>
                            <option value="Kids">Kids</option>
                            <option value="Adults">Adults</option>
                        </select>

                        <div className="">
                            <input
                            id="dateFilter"
                            type="date"
                            placeholder="Select Date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="md:w-full w-28 md:p-3 p-1 rounded-lg bg-white text-black"
                            />
                        </div>

                        <button
                            className="bg-green-600 text-white flex items-center justify-center md:p-3 p-1 rounded-lg hover:cursor-pointer hover:bg-green-500"
                            onClick={() => {
                                handleSearch();
                                console.log("Search clicked");
                            }}
                        >
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="overflow-auto space-y-4 scroll-smooth [scrollbar-width:none] border-white border-1 md:p-5 p-2 rounded-2xl lg:h-110 lg:w-210 h-110"> 
                        {attendanceData && attendanceData.length > 0 ? (
                                attendanceData.map((attendance) => (
                                    <div 
                                    key={attendance.user.userId}
                                    className="p-2 bg-gray-50 rounded-xl flex flex-row justify-between items-center relative text-black"
                                    >
                                        <p className="font-bold">{attendance.user.fullName}</p>
                                        <div className="flex flex-row md:gap-5 gap-2">
                                            <div className="flex flex-col">
                                                <label htmlFor="">Present</label>
                                                <input 
                                                type="checkbox"
                                                checked={attendance.isStatus === true}
                                                onChange={() => handleAttendanceChange(attendance.user.userId, true)}
                                                className="h-5 accent-green-500"/>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="">Absent</label>
                                                <input 
                                                type="checkbox"
                                                checked={attendance.isStatus === false}
                                                onChange={() => handleAttendanceChange(attendance.user.userId, false)}
                                                className="h-5 accent-red-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : 
                            (
                                <div>
                                    No data Found
                                </div>
                            )
                        }
                    </div>
                </div>

                <button
                    className="bg-green-600 text-white flex items-center justify-center md:p-2 p-1 rounded-lg hover:cursor-pointer hover:bg-green-500"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </section>
    )
}

export default UserAttendance