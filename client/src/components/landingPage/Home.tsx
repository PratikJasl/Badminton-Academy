import Carousel from "./Carasol";
import About from "./About";
import Service from "./Services";
import Contact from "./Contact";

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