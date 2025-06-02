import { lazy } from "react";
const Carousel = lazy(() => import("./Carasol"));
const About = lazy(() => import("./About")) ;
const Service = lazy(() => import("./Services"));
const Contact = lazy(() => import("./Contact"));
const Details = lazy(() => import("./Details"));
// const Introduce = lazy(() => import("./Intro"));

function LandingPage(){
    return(
        <>  
            <div className="flex flex-col min-h-screen items-center">
                <Carousel/>
                {/* <Introduce/> */}
                <About/>
                <Details/>
                <Service/>
                <Contact/>
            </div>
        </>
    )
}

export default LandingPage