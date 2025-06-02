import smash from '../../assets/smash.png';

function Introduce(){
    return(
        <section id='introduce' className="w-screen text-start mt-15 p-5">
            <div className="flex flex-row md:gap-40 gap-10 font-poppins">
                <div className="flex flex-col md:gap-15 gap-5 md:pt-15 md:p-15 pt-5">
                    <div className="flex flex-col">
                        <h1 className="md:text-5xl text-xl md:pl-2 mt-0 md:mb-[-1rem]">Any Body Can</h1>
                        <h1 className="md:text-[9rem] text-5xl font-bold mt-0 mb-0 p-0">smash!</h1>
                    </div>
                    <div className="flex flex-col md:gap-2 gap-0">
                        <h1 className="md:text-[30px] text-[13px]">Join the smash revolution at</h1>
                        <h1 className="md:text-3xl text-sm md:mt-[-1px] text-green-500">RJ Badminton</h1>
                        <button 
                            className="font-sans font-semibold md:mt-10 mt-2 w-fit bg-green-600 text-white lg:text-2xl text-sm p-2 px-6 lg:px-5 rounded-3xl hover:bg-green-500">
                            <a 
                                href="" 
                                target="blank">
                                Enroll Now!
                            </a>
                        </button>
                    </div>
                </div>
                <div>
                    <img 
                    src={smash} 
                    alt="smash image"
                    className='md:h-140 h-50' />
                </div>
            </div>
        </section>
    )
}

export default Introduce;