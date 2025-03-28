import design1 from "../../assets/Standard Pack.png";
import packDetails1 from "../../assets/packDetail.png";

function Service(){
    return(
        <section id="service" className="flex lg:flex-row flex-col items-center gap-5">
            <img src={design1} alt="" className="md:h-110 h-80"/>
            <img src={packDetails1} alt="" className="h-70 " />
        </section>
    )
}

export default Service