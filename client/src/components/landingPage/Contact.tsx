import { PhoneIcon } from "@heroicons/react/24/outline";

function Contact(){
    return(
        <section id="contacts" className="lg:p-5 p-25 w-full text-center lg:mt-15 mt-10">
            <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <h1 className="md:text-8xl text-3xl font-bold text-green-500">Contact us</h1>
                    <p className="text-center lg:text-xl text-lg">🏸 Our mission is to nurture talent and develop players capable of competing at state and national levels. We 
                        are commited to our mission and continiously strive for excilence. We are a team of humble and dedicated coaches, here to turn you into a badminton champ.
                    </p>
                    <button 
                        className="w-fit bg-green-500 text-white text-xl p-2 mt-5 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                        <a 
                            href="" 
                            target="blank">
                            Book a Demo Class
                        </a>
                    </button>
                </div>

                <div className="flex md:flex-row flex-wrap gap-5 w-full justify-center">
                    <a href="" target="blank">
                        <i className="fab fa-instagram text-3xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                    </a>
                    <a href="" target="blank">
                        <i className="fab fa-linkedin text-3xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                    </a>
                    <a href="" target="blank">
                        <i className="fab fa-youtube text-3xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                    </a>

                    <div className="flex items-center gap-2 hover:scale-115 active:scale-120 transition transform duration-500 ease-in-out">
                        <i className="fa-regular fa-envelope text-3xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                        <h3 className="text-lg">ranjit.subra@gmail.com</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                        <PhoneIcon className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg">8870018565</h3>
                    </div>
                </div>

                <h1>Made with ❤️ by <a href="https://pratikjasl.github.io/Portfolio-Website/" target="blank" className="hover:text-red-700 ">Pratik Jussal</a></h1>
            </div>
        </section>
    )
}

export default Contact