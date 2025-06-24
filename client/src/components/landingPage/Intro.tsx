import smash from '../../assets/smash.png';

function Introduce(){
    return(
        <section id='introduce' className="w-screen text-start mt-15 p-5">
            <div className="flex lg:flex-row flex-col items-center 2xl:gap-150 md:gap-70 gap-5 font-poppins">
                <div className="flex flex-col lg:order-1 order-2 md:gap-15 gap-2 md:pt-15 md:p-15 pt-5">
                    <div className="flex flex-col md:items-start items-center 2xl:gap-2">
                        <h1 className="2xl:text-6xl md:text-5xl text-2xl md:pl-2 mt-0 md:mb-[-1rem]">Any Body Can</h1>
                        <h1 className="2xl:text-[10rem] md:text-[9rem] text-6xl font-bold mt-0 mb-0 p-0 animate-fadeInLeft">smash!</h1>
                    </div>
                    <div className="flex flex-col md:gap-2 gap-0 md:items-start items-center">
                        <h1 className="2xl:text-[35px] md:text-[30px] text-[20px]">Join the smash revolution at</h1>
                        <h1 className="2xl:text-[35px] md:text-3xl text-md md:mt-[-1px] text-green-500">RJ Badminton</h1>
                        <button 
                            className="font-semibold md:mt-5 mt-2 w-fit bg-green-600 text-white 2xl:text-3xl md:text-2xl text-lg p-2 
                            px-6 lg:px-5 rounded-3xl hover:bg-green-500 animate-fadeInLeft">
                            <a 
                                href="" 
                                target="blank">
                                Enroll Now!
                            </a>
                        </button>
                    </div>
                </div>

                <div className='lg:order-2 order-1 animate-fadeInRight'>
                    <img 
                    src={smash} 
                    alt="smash image"
                    className='2xl:h-200 md:h-130 h-75' />
                </div>
            </div>
        </section>
    )
}

export default Introduce;