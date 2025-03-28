import Carousel from "./sections/Carasol";
import About from "./sections/About";
import Service from "./sections/Services";

function LandingPage(){
    return(
        <>  
            <div className="flex flex-col md:gap-50 gap-20 p-5 min-h-screen items-center">
                <Carousel/>
                <About/>
                <Service/>
            </div>
        </>
    )
}

export default LandingPage