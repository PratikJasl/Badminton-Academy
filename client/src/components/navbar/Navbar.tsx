import { useEffect, useState } from "react";
import { Bars3Icon} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { userInfoState } from "../../atom/userAtom";
import { useRecoilState } from "recoil";
import { getInitialUserInfo } from "../../services/storeUserInfo";
import person from "../../assets/person.png";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";


function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    console.log("The user info received is:", userInfo);

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    function logOut(){

    }

    useEffect(()=>{
        let localData = getInitialUserInfo();
        if(localData){
            setUserInfo(localData);
        }
    },[]);

    return(
        <>
            <div className="flex flex-row justify-between items-center font-serif fixed top-0 bg-gray-800 min-w-screen p-3 z-10">
                
                <div className="lg:text-2xl">
                   <a href="/">Badminton Academy</a>
                </div>

                {userInfo === null ?
                    <div className="flex items-center gap-5">
                        <a href="/Login" className="hover:text-blue-500  lg:text-xl">Login</a>
                        <a href="/Signup" className="hover:text-blue-500  lg:text-xl">SignUp</a>
                    </div> :
                    <div>
                        <div className="flex items-center">
                            <button onClick={toggleMenu} className="p-2">
                                {menuOpen ? (
                                    <XMarkIcon className="h-6 w-6 text-white" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6 text-white" />
                                )}
                            </button>
                        </div> 

                        {userInfo?.role != "student" ?
                            <div className={`${ menuOpen ? "block fixed right-0 top-13 z-10 p-10 h-screen md:w-72 w-64 bg-gray-800 text-white" : "hidden"}`}>
                                <div className="flex flex-col items-center justify-center p-4 gap-5">
                                    <img
                                        className="rounded-full lg:h-25 lg:w-20 h-15 w-15" 
                                        src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                                        alt="User">
                                    </img>
                                    {userInfo?.fullName && <h1>{userInfo.fullName}</h1>}
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Add Coaching Plan</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Add Coaching Schedule</a>
                                    <a href="/Location" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Add Locations</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Mark Payments</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Mark Attendance</a>
                                    <button className="flex flex-row p-2 rounded-xl hover:text-red-500 hover:scale-130 active:scale-120 transition transform duration-500 ease-in-out">
                                        LogOut
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-500" />
                                    </button>
                                </div>
                            </div> 
                            : 
                            <div className={`${ menuOpen ? "block fixed right-0 top-13 z-10 p-10 h-screen md:w-72 w-64 bg-gray-800 text-white" : "hidden"}`}>
                                <div className="flex flex-col items-center justify-center p-4 gap-5">
                                    <img
                                        className="rounded-full lg:h-25 lg:w-20 h-15 w-15" 
                                        src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                                        alt="User">
                                    </img>
                                    {userInfo?.fullName && <h1>{userInfo.fullName}</h1>}
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Coaching Plan</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Coaching Schedule</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Attendance</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Community</a>
                                    <a href="" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Contacts</a>
                                    <button className="flex flex-row p-2 rounded-xl hover:text-red-500 hover:scale-130 active:scale-120 transition transform duration-500 ease-in-out"
                                            onClick={logOut}
                                    >
                                        LogOut
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                }    
            </div>
        </>
    )
}

export default Navbar