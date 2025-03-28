import design1 from "../../assets/Standard Pack.png";
import packDetails1 from "../../assets/packDetail.png";
import packDetails2 from "../../assets/packDetails2.png";
import priceChart1 from "../../assets/priceChart1.png";
import priceChart2 from "../../assets/priceChart2.png";

function Service(){
    return(
        <section id="service" className="flex flex-col items-center justify-center gap-15 p-5">
            <h1 className="text-5xl font-serif font-bold text-yellow-400">STANDARD PACK</h1>
            <div className="flex lg:flex-row flex-col items-center gap-5">
                <img src={design1} alt="" className="md:h-110 h-70"/>
                <img src={packDetails1} alt="" className="md:90 h-70"/>
            </div>
            <div className="flex items-center mb-40">
                <img src={priceChart1} alt="" className="md:h-90 h-50" />
            </div>

            <h1 className="text-5xl font-serif font-bold text-yellow-400">PREMIUM PACK</h1>
            <div className="flex lg:flex-row flex-col items-center gap-5">
                <img src={design1} alt="" className="md:h-110 h-70"/>
                <img src={packDetails2} alt="" className="md:90 h-70"/>
            </div>
            <div className="flex items-center">
                <img src={priceChart2} alt="" className="md:h-90 h-50" />
            </div>

            <button 
                className="w-fit bg-yellow-500 text-white text-xl font-semibold p-2 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out mb-40">
                <a 
                    href="" 
                    target="blank">
                    Download Brochure
                </a>
            </button>
        </section>
    )
}

export default Service