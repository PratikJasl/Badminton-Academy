import profileImage from "../../assets/Profileimage2.png";
import { PhoneIcon } from "@heroicons/react/24/outline";

function About(){
    return(
        <section id="about" className="flex 2xl:max-w-900 md:max-w-300 max-w-82 md:p-5 2xl:mt-40 mt-30">
            <div className="flex lg:flex-row flex-col items-center justify-center 2xl:gap-100 md:gap-10 gap-5">
                <div className="flex flex-col order-2 md:order-none gap-5">
                    <div className="flex flex-col md:gap-8 gap-5 sm:items-center md:items-start md:text-left text-center">
                        <div className="flex flex-col md:items-start items-center md:gap-5 gap-1">
                            <p className="2xl:text-6xl md:text-4xl text-2xl">Meet</p>
                            <div className="flex flex-col 2xl:gap-2 md:gap-1">
                                <p className="2xl:text-8xl md:text-7xl text-4xl font-semibold">Ranjit </p>
                                <p className="2xl:text-8xl md:text-7xl text-4xl font-semibold">Subramaniyam</p>
                            </div>
                        </div>
                        
                        <p className="2xl:text-2xl md:text-xl text-xl">National Level Player and International Certified Badminton Coach</p>

                        <div className="md:mt-5 flex md:flex-row flex-col 2xl:gap-8 gap-5 w-full items-center animate-fadeInLeft">
                            <div>
                                 <button 
                                    className="w-fit font-semibold bg-green-600 text-white 2xl:text-2xl md:text-xl text-md p-2 px-4 lg:px-5  rounded-3xl hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                                    <a 
                                        href="" 
                                        target="blank">
                                        Book a Demo
                                    </a>
                                </button>
                            </div>
                           
                           <div className="flex flex-row md:gap-5 gap-3 md:justify-start justify-center items-center ">
                                <a href="" target="blank">
                                    <i className="fab fa-instagram 2xl:text-4xl md:text-3xl text-xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <a href="" target="blank">
                                    <i className="fab fa-linkedin 2xl:text-4xl md:text-3xl text-xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <a href="" target="blank">
                                    <i className="fab fa-youtube 2xl:text-4xl md:text-3xl text-xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                                </a>
                                <div className="flex items-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                                    <PhoneIcon className="2xl:h-8 2xl:w-8 md:h-6 md:w-6 h-3 w-3 text-blue-600" />
                                    <h3 className="2xl:text-2xl md:text-lg text-md">8870018565</h3>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="2xl:h-140 2xl:w-160 md:h-120 md:w-150 order-1 md:order-none">
                    <img 
                        src={profileImage}
                        alt="profile-pic" 
                        className="md:h-full md:w-full h-60 object-cover hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out" 
                    />
                </div>
            </div>
        </section>
    )
}

export default About