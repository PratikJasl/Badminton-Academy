import { lazy } from "react";
const Carousel = lazy(() => import("./Carasol"));
const About = lazy(() => import("./About")) ;
const Service = lazy(() => import("./Services"));
const Contact = lazy(() => import("./Contact"));

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