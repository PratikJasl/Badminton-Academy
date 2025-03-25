import { useState } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";


function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    return(
        <>
            <div className="flex flex-row justify-between shadow-lg w-full p-4 font-serif fixed top-0 bg-gray-800 z-10">
                
                <div className="text-xl font-semibold italic">
                   <a href="#home">Badminton Academy</a>
                </div>

                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="p-2">
                        {menuOpen ? (
                            <XMarkIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                            <Bars3Icon className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </div>
                
                <div className="hidden lg:flex flex-row list-none gap-4 text-lg">
                    <a href="#home" className="hover:text-blue-600">Home</a>
                    <a href="#services" className="hover:text-blue-600">Services</a>
                    <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
                    <a href="#community" className="hover:text-blue-600">Dash</a>
                    <a href="#contact" className="hover:text-blue-600">Contacts</a>
                </div>

                <div className={`lg:hidden ${ menuOpen ? "block absolute top-16 right-0 shadow-lg bg-gray-900 text-white" : "hidden"}`}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <a href="#home" className="hover:text-blue-600">Home</a>
                        <a href="#services" className="hover:text-blue-600">Services</a>
                        <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
                        <a href="#community" className="hover:text-blue-600">Community</a>
                        <a href="#contact" className="hover:text-blue-600">Contacts</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar