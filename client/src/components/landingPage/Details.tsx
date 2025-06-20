import { useEffect, useState } from "react";
import profileImage from "../../assets/Profileimage4.png";

function Details(){
    const [playersTrained, setPlayersTrained] = useState(0);
    const [stateTournaments, setStateTournaments] = useState(0);
    const [nationalTournaments, setNationalTournaments] = useState(0);

    useEffect(()=>{
        const playersCount = 300;
        const stateCount = 100;
        const nationalCount = 50;

        //@dev: Count up animation for Players Trained
        const countUpPlayers = setInterval(() => {
            setPlayersTrained((prev) => {
                if (prev < playersCount) return prev + 1;
                clearInterval(countUpPlayers); // Stop once the count is reached
                return playersCount;
            });
        }, 20); // Update every 20ms

        //@dev: Count up animation for State Tournaments
        const countUpState = setInterval(() => {
            setStateTournaments((prev) => {
                if (prev < stateCount) return prev + 1;
                clearInterval(countUpState); // Stop once the count is reached
                return stateCount;
            });
        }, 30); // Update every 30ms

        //@dev: Count up animation for National Tournaments
        const countUpNational = setInterval(() => {
            setNationalTournaments((prev) => {
                if (prev < nationalCount) return prev + 1;
                clearInterval(countUpNational); // Stop once the count is reached
                return nationalCount;
            });
        }, 50); // Update every 50ms

        return () => {
            clearInterval(countUpPlayers);
            clearInterval(countUpState);
            clearInterval(countUpNational);
        };
    },[])

    return(
        <section id="details" className="w-full 2xl:mt-40 md:mt-25 mt-30">
            <div className="w-full flex flex-col 2xl:gap-40 gap-20 items-center bg-center bg-no-repeat h-100">   
                <div className="flex md:flex-row flex-col 2xl:gap-130 md:gap-60 gap-15 items-center justify-center md:text-start text-center p-5">
                    <div>
                        <img 
                            src={profileImage} 
                            alt="Profile"
                            className="2xl:h-140 md:h-110 h-65 object-cover"
                        />
                    </div>

                    <div className="flex flex-col md:gap-8 gap-5 2xl:w-140 md:w-110 w-74">
                        <div className="2xl:text-9xl md:text-8xl text-5xl">
                            <h1 className="font-bold">Who are <span className="text-green-400">we</span>? </h1>
                        </div>

                        <p className="2xl:text-4xl md:text-2xl text-xl">
                            RJ Badminton is the brainchild of Ranjit once ranked <span className="font-bold text-green-400">#16 in India</span>  and <span className="font-bold text-green-400">#2 in his state</span>, 
                            now a full-time coach with a big passion for the game.
                        </p>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col 2xl:gap-130 md:gap-45 gap-15 items-center justify-center w-full p-5">
                    <div className="flex flex-col order-2 md:order-none md:gap-5 gap-1 2xl:w-140 md:w-110 w-74 items-center justify-center md:text-start text-center">
                        <p className="2xl:text-9xl md:text-8xl text-5xl font-bold">
                            From <span className="text-green-400">street</span> to <span className="text-green-400">state</span> !!
                        </p>
                        <p className="mt-5 2xl:text-4xl md:text-2xl text-xl">
                            Our Mission? To nurture talent from the <span className="text-green-400">grassroots</span> and elevate it to the highest levels of <span className="text-green-400">competition.</span>
                        </p>
                    </div>
                    
                    <div className="order-1 lg:order-none">
                        <img 
                            src={profileImage} 
                            alt="Profile"
                            className="2xl:h-140 md:h-110 h-65 object-cover"
                        />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col 2xl:gap-60 md:gap-40 gap-20 items-center justify-center w-full 2xl:p-25 p-10 bg-green-900 font-serif mt-5">   
                    <div className="flex flex-col 2xl:gap-5 text-center">
                        <h1 className="2xl:text-7xl md:text-5xl text-4xl">{playersTrained}+</h1>
                        <p className="2xl:text-5xl text-3xl mt-2">Players Trained</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 text-center">
                        <h1 className="2xl:text-7xl md:text-5xl text-4xl">{stateTournaments}+</h1>
                        <p className="2xl:text-5xl text-3xl mt-2">State Tournaments</p>
                    </div>

                    <div className="flex flex-col 2xl:gap-5 text-center">
                        <h1 className="2xl:text-7xl md:text-5xl text-4xl">{nationalTournaments}+</h1>
                        <p className="2xl:text-5xl text-3xl mt-2">National Tournaments</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details;