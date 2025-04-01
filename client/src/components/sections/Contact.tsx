import { PhoneIcon } from "@heroicons/react/24/outline";

function Contact(){
    return(
        <section id="contacts" className="bg-black p-5 w-full text-cente">
            <div className="flex flex-col gap-8 items-center">
                <h1 className="md:text-5xl text-3xl text-yellow-500">Reach out to us</h1>
                <p className="text-center lg:text-xl text-lg">🏸 Our mission is to nurture talent and develop players capable of competing at state and national levels. We 
                    are commited to our mission and continious strive for excilence.
                </p>
                <button 
                    className="w-fit bg-yellow-500 text-white text-xl p-2 mt-5 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                    <a 
                        href="" 
                        target="blank">
                        Book a Demo Class
                    </a>
                </button>

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