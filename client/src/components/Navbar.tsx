import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import person from "../assets/person.png";
// import male from "../assets/male.png";
// import female from "../assets/female.png";


function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    return(
        <>
            <div className="flex flex-row justify-between shadow-lg w-full p-2 font-serif fixed top-0 bg-gray-800 z-10">
                
                <div className="text-xl font-semibold italic">
                   <a href="#home">Badminton Academy</a>
                </div>

                <div className="flex items-center">
                    <button onClick={toggleMenu} className="p-2">
                        {menuOpen ? (
                            <XMarkIcon className="h-6 w-6 text-white" />
                        ) : (
                            <Bars3Icon className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>
                
                <div className={`${ menuOpen ? "block fixed right-0 top-13 z-10 p-10 h-screen bg-gray-800 text-white" : "hidden"}`}>
                    <div className="flex flex-col items-center justify-center p-4 gap-5">
                        <img className="rounded-full lg:h-25 lg:w-20 h-15 w-15 mb-5" src={person} alt="User"></img>
                        <a href="#home" className="p-2 rounded-xl w-62 hover:bg-blue-500 bg-white text-black">Coaching Plan</a>
                        <a href="#services" className="p-2 rounded-xl w-62 hover:bg-blue-500 bg-white text-black">Coaching Schedule</a>
                        <a href="#testimonials" className="p-2 rounded-xl w-62 hover:bg-blue-500 bg-white text-black">Attendance</a>
                        <a href="#community" className="p-2 rounded-xl w-62 hover:bg-blue-500 bg-white text-black">Community</a>
                        <a href="#contact" className="p-2 rounded-xl w-62 hover:bg-blue-500 bg-white text-black">Contacts</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar