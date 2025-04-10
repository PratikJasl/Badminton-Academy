import Carousel from "./Carasol";
import About from "./About";
import Service from "./Services";
import Contact from "./Contact";
import { useEffect } from "react";
import { userInfoState } from "../../atom/userAtom";
import { useSetRecoilState } from "recoil";
import { getInitialUserInfo } from "../../services/storeUserInfo";

function LandingPage(){
    const setUserInfo = useSetRecoilState(userInfoState);
    
    useEffect(()=>{
        let localData = getInitialUserInfo();
        if(localData){
            setUserInfo(localData);
        }
    },[]);

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