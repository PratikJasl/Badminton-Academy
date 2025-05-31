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
        <section id="details" className="w-full lg:mt-25 mt-30">
            <div className="w-full flex flex-col gap-20 items-center bg-center bg-no-repeat h-100">   
                <div className="flex lg:flex-row flex-col lg:gap-60 gap-15 items-center justify-center lg:text-start text-center p-5">
                    <div>
                        <img 
                            src={profileImage} 
                            alt="Profile"
                            className="lg:h-110 h-75 object-cover"
                        />
                    </div>
                    <div className="flex flex-col lg:gap-8 gap-5 lg:w-110 w-74">
                        <div className="lg:text-8xl text-4xl">
                            <h1 className="font-bold">Who are <span className="text-green-400">we</span> ? </h1>
                        </div>

                        <p className="lg:text-2xl text-xl">
                            RJ Badminton is the brainchild of Ranjit once ranked <span className="font-bold text-green-400">#16 in India</span>  and <span className="font-bold text-green-400">#2 in his state</span>, 
                            now a full-time coach with a big passion for the game.
                        </p>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col lg:gap-45 gap-15 items-center justify-center w-full p-5">
                    <div className="flex flex-col order-2 lg:order-none lg:gap-5 gap-1 lg:w-110 w-74 items-center justify-center lg:text-start text-center">
                        <p className="lg:text-8xl text-4xl font-bold">
                            From <span className="text-green-400">street</span> to <span className="text-green-400">state</span> !!
                        </p>
                        <p className="mt-5 lg:text-2xl text-xl">
                            Our Mission? To nurture talent from the grassroots and elevate it to the highest levels of competition.
                        </p>
                    </div>
                    
                    <div className="order-1 lg:order-none">
                        <img 
                            src={profileImage} 
                            alt="Profile"
                            className="lg:h-110 h-75 object-cover"
                        />
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col lg:gap-40 gap-20 items-center justify-center w-full p-10 bg-green-900  font-serif mt-5">   
                    <div className="text-center  ">
                        <h1 className="text-6xl">{playersTrained}+</h1>
                        <p className="text-3xl mt-2">Players Trained</p>
                    </div>

                    <div className="text-center  ">
                        <h1 className="text-6xl">{stateTournaments}+</h1>
                        <p className="text-3xl mt-2">State Tournaments</p>
                    </div>

                    <div className="text-center">
                        <h1 className="text-6xl">{nationalTournaments}+</h1>
                        <p className="text-3xl mt-2">National Tournaments</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details;