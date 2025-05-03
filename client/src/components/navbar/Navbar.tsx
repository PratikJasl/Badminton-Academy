import { useState } from "react";
import { useRecoilState } from "recoil";
import male from "../../assets/male.png";
import person from "../../assets/person.png";
import female from "../../assets/female.png";
import { userInfoState } from "../../atom/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { logOutService } from "../../services/authService";
import { clearUserInfo } from "../../services/storeUserInfo";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigate = useNavigate();

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    async function handleLogOut(): Promise<void>{ 
        try {
            console.log("----- Handle Log OUT-----");
            const response = await logOutService();
            console.log("Response of Logout:", response);
            if(response?.status === 200){ 
                await clearUserInfo();
                setUserInfo(null);
                navigate("/");
                console.log("Logged Out");
            }
        } catch (error) {
            console.log("Error Logging Out", error);
        }
    }

    return(
        <>
            <div className="flex flex-row justify-between items-center font-serif fixed top-0 bg-gray-900 min-w-screen h-12 p-3 z-10">
                
                <div className="lg:text-2xl">
                   <Link to="/">Badminton Academy</Link>
                   {/* <img src={Logo} alt="" className="h-15 w-20" /> */}
                </div>

                {userInfo === null ?
                    <div className="flex items-center gap-5">
                        <Link to="/Login" className="hover:text-blue-500  lg:text-xl">Login</Link>
                        <Link to="/Signup" className="hover:text-blue-500  lg:text-xl">SignUp</Link>
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
                            <div 
                                className={`fixed right-0 top-13 z-10 p-10 h-screen md:w-72 w-64 bg-gray-800 text-white
                                transform transition-all duration-500 ease-in-out
                                ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
                            >
                                <div className="flex flex-col items-center justify-center p-4 gap-5">
                                    <img
                                        className="rounded-full lg:h-25 lg:w-20 h-18 w-15" 
                                        src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                                        alt="User">
                                    </img>
                                    {userInfo?.fullName && <h1>{userInfo.fullName}</h1>}
                                    <Link to="/UserPlan" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">User Details</Link>
                                    <Link to="/Schedule" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Schedule</Link>
                                    <Link to="/Location" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Locations</Link>
                                    <Link to="/Attendance" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Attendance</Link>
                                    <Link to="/Payments" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Payments</Link>
                                    
                                    <button 
                                        className="flex flex-row p-2 rounded-xl hover:text-red-500 hover:scale-130 active:scale-120 transition transform duration-500 ease-in-out"
                                        onClick={handleLogOut}
                                    >
                                        LogOut
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-500" />
                                    </button>
                                </div>
                            </div> 
                            : 
                            <div 
                                className={`fixed right-0 top-13 z-10 p-10 h-screen md:w-72 w-64 bg-gray-800 text-white
                                transform transition-all duration-500 ease-in-out
                                ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
                            >
                                <div className="flex flex-col items-center justify-center p-4 gap-5">
                                    <img
                                        className="rounded-full lg:h-25 lg:w-20 h-15 w-15" 
                                        src={userInfo?.gender==='male'?male : userInfo?.gender === 'female'? female : userInfo?.gender ==='other' || !userInfo?.gender? person : person}  
                                        alt="User">
                                    </img>
                                    {userInfo?.fullName && <h1>{userInfo.fullName}</h1>}
                                    <Link to="/UserPlan" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">User Details</Link>
                                    <Link to="/Schedule" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Schedule</Link>
                                    <Link to="/Location" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Locations</Link>
                                    <Link to="/Attendance" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Attendance</Link>
                                    <Link to="/Payments" className="p-2 rounded-xl md:w-62 w-56 hover:bg-blue-500 bg-white text-black">Payments</Link>
                                    
                                   
                                    <button 
                                        className="flex flex-row p-2 rounded-xl hover:text-red-500 hover:scale-130 active:scale-120 transition transform duration-500 ease-in-out"
                                        onClick={handleLogOut}
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