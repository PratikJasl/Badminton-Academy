import design1 from "../../assets/Standard Pack.png";
import packDetails1 from "../../assets/packDetails.png";
import packDetails2 from "../../assets/packDetails2.png";
import priceChart1 from "../../assets/priceChart1.png";
import priceChart2 from "../../assets/priceChart2.png";

function Service(){
    return(
        <section id="service" className="flex flex-col items-center justify-center md:max-w-280 max-w-96 p-5">
            {/* Standard pack details */}
            <div className="flex flex-col items-center justify-center text-center md:gap-15 gap-10 p-5">
                <h1 className="md:text-5xl text-3xl font-serif font-bold text-yellow-400">STANDARD PACK</h1>
                <div className="flex lg:flex-row flex-col items-center justify-center md:gap-5 gap-10">
                    <img src={design1} alt="" className="md:h-110 h-60"/>
                    <img src={packDetails1} alt="" className="h-60"/>
                </div>

                <div className="text-center">
                    <h1 className="md:text-5xl text-2xl text-gray-400 font-serif">*Effective Price including all charges</h1>
                </div>

                <div className="flex items-center md:mb-40 mb-20">
                    <img src={priceChart1} alt="" className="md:h-100 h-60" />
                </div>
            </div>

            {/* Premium pac details */}
            <div className="flex flex-col items-center justify-center md:gap-15 gap-10 p-5">
                <h1 className="md:text-5xl text-3xl font-serif font-bold text-yellow-400">PREMIUM PACK</h1>
                <div className="flex lg:flex-row flex-col items-center justify-center md:gap-5 gap-10">
                    <img src={design1} alt="" className="md:h-110 h-60"/>
                    <img src={packDetails2} alt="" className="h-60"/>
                </div>
                
                <div className="text-center">
                    <h1 className="md:text-5xl text-2xl text-gray-400 font-serif">*Effective Price including all charges</h1>
                </div>
                
                <div className="flex items-center mb-10">
                    <img src={priceChart2} alt="" className="md:h-100 h-60" />
                </div>
            </div>
           
            <button 
                className="w-fit bg-yellow-500 text-white text-xl p-2 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
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