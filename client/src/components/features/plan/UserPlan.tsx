import male from "../../../assets/male.png";
import person from "../../../assets/person.png";
import female from "../../../assets/female.png";
import { useRecoilValue } from 'recoil';
import { MapPinIcon } from "@heroicons/react/24/outline";
import { userInfoState } from "../../../atom/userAtom";
import { UserIcon } from "@heroicons/react/24/outline";

//@dev: Function to fetch user Plan.
function UserPlan(){
    const userInfo = useRecoilValue(userInfoState);
    console.log("User Info", userInfo);
    
    let percentageElapsed = 0;
    let startDate = null;
    let endDate = null;
    let totalDuration = 0;
    let elapsedDuration = 0;

    if (userInfo && userInfo.planStartDate && userInfo.planEndDate) {
        try {
            startDate = new Date(userInfo.planStartDate);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(userInfo.planEndDate);
            endDate.setHours(23, 59, 59, 999);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            totalDuration = endDate.getTime() - startDate.getTime();
            elapsedDuration = today.getTime() - startDate.getTime();

            if (totalDuration > 0) {
                percentageElapsed = (elapsedDuration / totalDuration) * 100;
            } else {
                 if (startDate.toDateString() === today.toDateString()) {
                     percentageElapsed = 100;
                 } else {
                     percentageElapsed = 0;
                 }
            }

            percentageElapsed = Math.max(0, Math.min(100, percentageElapsed));

        } catch (error) {
            console.error("Error calculating plan progress:", error);
            percentageElapsed = 0;
        }
    }

    let formattedStartDate = "N/A";
    let formattedEndDate = "N/A";
    if (userInfo && userInfo.planStartDate) {
        try {
            const startDateObj = new Date(userInfo.planStartDate);
            // Check if the date object is valid
            if (!isNaN(startDateObj.getTime())) {
                 const options = { day: "numeric", month: "long", year: "numeric" } as const;
                 formattedStartDate = new Intl.DateTimeFormat('en-US', options).format(startDateObj);
            }
        } catch (error) {
            console.error("Error formatting start date:", error);
        }
    }

    if (userInfo && userInfo.planEndDate) {
         try {
            const endDateObj = new Date(userInfo.planEndDate);
             // Check if the date object is valid
             if (!isNaN(endDateObj.getTime())) {
                const options = { day: "numeric", month: "long", year: "numeric" } as const;
                formattedEndDate = new Intl.DateTimeFormat('en-US', options).format(endDateObj);
            }
         } catch (error) {
             console.error("Error formatting end date:", error);
         }
    }

    return(
        <section id="UserPlan" className="lg:mb-15">
            <div className="flex flex-col md:gap-3 gap-2 items-center text-center md:p-5 p-3  rounded-2xl lg:h-130 h-130 lg:w-200 w-74 md:mt-18 mt-10">
            {userInfo === null ?
                null:
                <div 
                    className=""
                >
                    <div className="flex flex-col items-center justify-center p-4 gap-5">
                        <img
                            className="rounded-full lg:h-25 lg:w-20 h-18 w-15" 
                            src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                            alt="User">
                        </img>
                        {userInfo?.fullName && <h1 className="text-xl">{userInfo.fullName}</h1>}
                        <div className="flex flex-row Lg:w-74 items-center justify-center gap-5">
                            <div className="flex flex-row gap-1 w-25">
                                <UserIcon className="h-6 w-6 text-gray-500" />
                                <h3 className="text-lg text-gray-300">{userInfo?.role}</h3>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-500"> | </h3>
                            </div>
                            <div className="flex flex-row gap-1 w-25">
                                <MapPinIcon className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                                <h3 className="text-lg text-gray-200">{userInfo?.locationName}</h3>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-5 p-5 shadow-xl shadow-gray-400 rounded-2xl lg:w-94 lg:h-64">
                            <div>
                                <h2 className="text-2xl font-bold">{userInfo.planName}</h2>
                            </div>
                            
                            <div>
                                <h3>Ends on: {formattedEndDate}</h3>
                            </div>

                            {startDate && endDate && ( // Render progress bar only if dates are valid
                                
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden mt-2">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${percentageElapsed}%` }}
                                    ></div>
                                </div>
                            )}
                            {startDate && endDate && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {percentageElapsed.toFixed(1)}% elapsed
                                </p>
                            )}
                        </div>
                    </div>
                </div>    
            }
            </div>
        </section>
    )
}

export default UserPlan
