import { PhoneIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";

function Contact(){ 
    return(
        <section id="contacts" className="2xl:mt-20 md:px-25 p-10 px-30 w-full text-center bg-green-950">
            <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <h1 className="2xl:text-8xl md:text-6xl text-5xl font-bold">Contact <span className="text-green-500">Us</span></h1>
                    <p className="md:text-center text-justify md:text-xl 2xl:text-2xl text-lg">
                        Have questions, feedback, or just want to say hello? Just reach us through our contact details below. We'd love to hear from you!
                        You can expect a call back shortly!
                    </p>
                </div>
                
                <div className="flex flex-col gap-5 w-full items-center justify-center">
                    <div className="flex items-center justify-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                        <MapPinIcon className="2xl:h-10 2xl:w-10 h-8 w-8 text-red-500" />
                        <h3 className="2xl:text-xl text-lg">Bangalore, Karnataka, India</h3>
                    </div>

                    <div className="flex items-center justify-center gap-2 hover:scale-115 active:scale-120 transition transform duration-500 ease-in-out">
                        <i className="fa-regular fa-envelope text-3xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                        <h3 className="2xl:text-xl text-lg">ranjit.subra@gmail.com</h3>
                    </div>

                    <div className="flex items-center justify-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                        <PhoneIcon className="2xl:h-8 2xl:w-8 h-6 w-6 text-blue-600" />
                        <h3 className="2xl:text-xl text-lg">8870018565</h3>
                    </div>
                    <button 
                        className="w-fit bg-green-600 text-white text-xl 2xl:text-2xl p-2 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                        <a 
                            href="" 
                            target="blank">
                            Get in Touch!
                        </a>
                    </button>
                    
                </div>

                <h1>Made with ❤️ by <a href="https://pratikjasl.github.io/Portfolio-Website/" target="blank" className="hover:text-red-700 ">Pratik Jussal</a></h1>
            </div>
        </section>
    )
}

export default Contact;