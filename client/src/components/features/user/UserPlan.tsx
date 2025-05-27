import male from "../../../assets/male.png";
import person from "../../../assets/person.png";
import female from "../../../assets/female.png";
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { MapPinIcon } from "@heroicons/react/24/outline";
import { userInfoState } from "../../../atom/userAtom";
import { UserIcon } from "@heroicons/react/24/outline";

//@dev: Function to fetch user Plan.
function UserPlan(){
    const userInfo = useRecoilValue(userInfoState);
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

    let formattedEndDate = "N/A";
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
            <div className="flex flex-col md:gap-3 gap-2 items-center text-center md:p-5 p-3  rounded-2xl lg:h-130 h-130 lg:w-200 w-74 md:mt-5 mt-10">
                {userInfo === null ?
                    <div> <div className="text-2xl font-bold text-gray-500">No User Found. Login Again</div> </div>
                :
                    <div className="flex flex-col items-center justify-center p-4 gap-5">
                        {/*First Section*/}
                        <div className="flex flex-col items-center justify-center gap-5">
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
                        </div>
                        {/*Second Section*/}
                        <div className="flex flex-col justify-center gap-15 p-5 bg-gray-900 rounded-2xl lg:w-94 lg:h-64 border-2 border-green-500 relative">
                            <div className="flex flex-col justify-start items-start gap-1">
                                <h4 className="font-bold text-green-500"> | {userInfo?.membershipStatus?"Active": "InActive"}</h4>
                                <h2 className="lg:text-2xl text-xl font-bold">{userInfo.coachingPlanName}</h2>
                            </div>
                            
                            <div className="flex flex-col items-start">
                                <h3 className="">Ends on: {formattedEndDate}</h3>
                                {startDate && endDate && ( //@dev: Render progress bar only if dates are valid
                                
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden mt-2">
                                    <div
                                        className="bg-green-500 h-2.5 rounded-full"
                                        style={{ width: `${percentageElapsed}%` }}
                                    ></div>
                                </div>
                                )}
                                {startDate && endDate && (
                                    <p className=" text-gray-500 mt-3 self-center">
                                        {percentageElapsed.toFixed(1)}% Elapsed
                                    </p>
                                )}
                            </div>
                        </div>

                        <Link 
                            to="/UserDetails"
                            className="text-blue-500 hover:text-white hover:cursor-pointer"
                        > 
                            More Details !!
                        </Link>
                    </div>
                }
            </div>
        </section>
    )
}

export default UserPlan
