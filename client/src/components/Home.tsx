import Carousel from "./sections/Carasol";
import About from "./sections/About";
import Service from "./sections/Services";
import Contact from "./sections/Contact";

function LandingPage(){
    return(
        <>  
            <div className="flex flex-col md:gap-50 gap-20 min-h-screen items-center">
                <Carousel/>
                <About/>
                <Service/>
                <Contact/>
            </div>
        </>
    )
}

export default LandingPage