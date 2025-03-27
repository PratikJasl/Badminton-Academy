import Carousel from "./sections/Carasol";
import About from "./sections/About";

function LandingPage(){
    return(
        <>  
            <div className="flex flex-col items-center justify-center">
                <Carousel/>
                <About/>
            </div>
        </>
    )
}

export default LandingPage