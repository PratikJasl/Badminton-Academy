import { lazy } from "react";
const Carousel = lazy(() => import("./Carasol"));
const About = lazy(() => import("./About")) ;
// const Service = lazy(() => import("./Services"));
const Contact = lazy(() => import("./Contact"));
const Details = lazy(() => import("./Details"));
const Introduce = lazy(() => import("./Intro"));
const WhyUs = lazy(() => import("./WhyUs"));
const Testimonials = lazy(() => import("./Testimonials"));

function LandingPage(){
    return(
        <>  
            <div className="flex flex-col min-h-screen items-center">
                
                <Introduce/>
                <About/>
                <Details/>
                <WhyUs/>
                <Carousel/>
                <Testimonials/>
                {/* <Service/> */}
                <Contact/>
            </div>
        </>
    )
}

export default LandingPage