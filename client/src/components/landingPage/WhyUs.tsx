import whyUs1 from "../../assets/whyus1.png";
import whyUs2 from "../../assets/whyus2.png";
import whyUs3 from "../../assets/whyus3.png";
import whyUs4 from "../../assets/whyus4.png";
import whyUs5 from "../../assets/whyus5.png";
import whyUs6 from "../../assets/whyus6.png";

function WhyUS(){
    return(
        <section id="why-us" className="w-full 2xl:mt-400 md:mt-235 mt-380 p-25">
            <div className="flex flex-col items-center justify-center 2xl:gap-15 gap-5">
                <div className="flex flex-col items-center justify-center 2xl:gap-15 md:gap-8 md:w-full w-86 gap-5">
                    <h1 className="2xl:text-9xl md:text-8xl text-6xl font-bold">Why <span className="text-green-400">Us</span> ?</h1>
                    <p className="2xl:text-3xl md:text-2xl text-xl text-center">
                        What makes us unique is our unwavering commitment to <span className="text-green-400">excellence. </span>
                        <span className="hidden lg:block">We are not just a training academy, we are a community that fosters growth, and sportsmanship. </span>
                    </p>
                </div>

                <div className="flex flex-row items-center justify-start gap-10 p-5 overflow-x-auto scrollbar-custom w-[20rem] md:w-[61rem] 2xl:w-[82rem]">
                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs1} alt="coach-student" className="md:h-45 md:w-35 h-35" />
                        <h1 className="lg:text-xl text-lg font-bold">One on One Mentorship</h1>
                        <p className="text-md">Personalized coaching tailored to individual player needs.</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs4} alt="coach-student" className="lg:h-45 lg:w-50 h-35" />
                        <h1 className="lg:text-xl text-lg font-bold">Group Training Sessions</h1>
                        <p className="text-md">Collaborative training that enhances teamwork and skills.</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs2} alt="coach-student" className="lg:h-45 lg:w-25 h-35" />
                        <h1 className="lg:text-xl text-lg font-bold">Experienced Coaches</h1>
                        <p className="text-md">Certified coaches with National and International experience.</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs5} alt="coach-student" className="lg:h-45 lg:w-40 h-35" />
                        <h1 className="lg:text-xl text-lg font-bold text-black">Structured Training</h1>
                        <p className="text-md">Step by Step training from basics to advanced.</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs3} alt="coach-student" className="lg:h-45 lg:w-70 h-35" />
                        <h1 className="lg:text-lg text-lg font-bold">Fitness & Injury Prevention</h1>
                        <p className="text-md">Badminton specific fitness and injury prevention sessions.</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 gap-2 items-center text-center shrink-0 p-5 2xl:h-90 md:h-80 h-65 lg:w-72 w-70 bg-white text-black rounded-2xl hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out">
                        <img src={whyUs6} alt="coach-student" className="lg:h-45 lg:w-45 h-35" />
                        <h1 className="lg:text-xl text-lg font-bold text-black">Regular Tournaments</h1>
                        <p className="text-md">Match experience through inhouse and inter-academy events.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyUS;