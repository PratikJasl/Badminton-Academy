import profileImage from "../../assets/Profileimage2.png";
import { PhoneIcon } from "@heroicons/react/24/outline";

function About(){
    return(
        <section id="about" className="flex md:max-w-300 max-w-82 lg:p-5 mt-30">
            <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-10 gap-5">
                <div className="flex flex-col order-2 lg:order-none gap-5">
                    <div className="flex flex-col md:gap-8 gap-5 sm:items-center lg:items-start lg:text-left text-center">
                        <div className=" flex flex-col lg:items-start items-center md:gap-5 gap-1">
                            <p className="lg:text-4xl text-2xl">Meet</p>
                            <div className="flex flex-col md:gap-1">
                                <p className="lg:text-7xl text-4xl font-semibold">Ranjit </p>
                                <p className="lg:text-7xl text-4xl font-semibold">Subramaniyam</p>
                            </div>
                        </div>
                        
                        <p className="lg:text-xl text-xl">National Level Player and International Certified Badminton Coach</p>

                        <div className="lg:mt-5 flex lg:flex-row flex-col gap-5 w-full items-center">
                            <div>
                                 <button 
                                    className="w-fit font-semibold bg-green-600 text-white lg:text-xl text-md p-2 px-4 lg:px-5  rounded-3xl hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                                    <a 
                                        href="" 
                                        target="blank">
                                        Book a Demo
                                    </a>
                                </button>
                            </div>
                           
                           <div className="flex flex-row lg:gap-5 gap-3 lg:justify-start justify-center items-center">
                                <a href="" target="blank">
                                    <i className="fab fa-instagram lg:text-3xl text-xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <a href="" target="blank">
                                    <i className="fab fa-linkedin lg:text-3xl text-xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <a href="" target="blank">
                                    <i className="fab fa-youtube lg:text-3xl text-xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <div className="flex items-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                                    <PhoneIcon className="lg:h-6 lg:w-6 h-3 w-3 text-blue-600" />
                                    <h3 className="lg:text-lg text-md">8870018565</h3>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="lg:h-120 lg:w-150 order-1 lg:order-none">
                    <img 
                        src={profileImage}
                        alt="profile-pic" 
                        className="lg:h-full lg:w-full h-60 object-cover hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out" 
                    />
                </div>
            </div>
        </section>
    )
}

export default About