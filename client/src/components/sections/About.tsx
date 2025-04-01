import profileImage from "../../assets/carasol-1.png";
import signature from "../../assets/signature.png";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import bgImage from "../../assets/grass.jpg";

function About(){
    const [playersTrained, setPlayersTrained] = useState(0);
    const [stateTournaments, setStateTournaments] = useState(0);
    const [nationalTournaments, setNationalTournaments] = useState(0);

    useEffect(()=>{
        const playersCount = 300;
        const stateCount = 100;
        const nationalCount = 50;

        // Count up animation for Players Trained
        const countUpPlayers = setInterval(() => {
            setPlayersTrained((prev) => {
                if (prev < playersCount) return prev + 1;
                clearInterval(countUpPlayers); // Stop once the count is reached
                return playersCount;
            });
        }, 20); // Update every 20ms

        // Count up animation for State Tournaments
        const countUpState = setInterval(() => {
            setStateTournaments((prev) => {
                if (prev < stateCount) return prev + 1;
                clearInterval(countUpState); // Stop once the count is reached
                return stateCount;
            });
        }, 30); // Update every 30ms

        // Count up animation for National Tournaments
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
        <section id="about" className="md:max-w-300 max-w-74 p-5">
            <div className="lg:flex lg:flex-row lg:items-center lg:gap-5">
                <div className="lg:h-120 lg:w-250 mb-10 border-10 border-white rounded-lg shadow-xl shadow-gray-600">
                    <img 
                        src={profileImage}
                        alt="profile-pic" 
                        className="h-full w-full object-cover hover:scale-110 active:scale-110 transition-transform duration-800 ease-in-out" 
                    />
                </div>

                <div className="text-center font-serif flex flex-col gap-5 items-center">
                    <div className="flex flex-col items-center gap-5">
                        <p className="lg:text-3xl text-xl">Meet</p>
                        <p className="lg:text-5xl text-2xl">Ranjit Subramaniyam</p>
                        <p className="lg:text-2xl text-xl italic">National's Player & International Certified Badminton Coach</p>
                        <p className="text-justify lg:text-lg"> 
                            Ranjit is an internationally certified badminton coach, having earned his certification in Thailand. He was ranked 16th nationally in India and held a state ranking of 2nd.
                            With over 200 students mentored, Ranjit has successfully guided players at both state and national levels.
                        </p>

                        <div className="flex flex-row gap-5 w-full justify-center">
                            <a href="" target="blank">
                                <i className="fab fa-instagram text-3xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                            </a>
                            <a href="" target="blank">
                                <i className="fab fa-linkedin text-3xl text-blue-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                            </a>
                            <a href="" target="blank">
                                <i className="fab fa-youtube text-3xl text-red-500 hover:scale-150 active:scale-150 transition transform duration-500 ease-in-out"></i>
                            </a>
                            <div className="flex items-center gap-2 hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                                <PhoneIcon className="h-6 w-6 text-blue-600" />
                                <h3 className="text-lg">8870018565</h3>
                            </div>
                        </div>

                        <div>
                            <img src={signature} alt="signature" />
                        </div>

                        <button 
                            className="w-fit bg-yellow-500 text-white text-xl p-2 rounded-lg hover:scale-120 active:scale-120 transition transform duration-500 ease-in-out">
                            <a 
                                href="" 
                                target="blank">
                                Book a Demo Class
                            </a>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between font-serif mt-20 bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="text-5xl p-10 text-center">
                    <h1>{playersTrained}+</h1>
                    <p className="text-2xl p-3">Players Trained</p>
                </div>

                <div className="text-5xl p-10 text-center">
                    <h1>{stateTournaments}+</h1>
                    <p className="text-2xl p-3">State Tournaments</p>
                </div>

                <div className="text-5xl p-10 text-center">
                    <h1>{nationalTournaments}+</h1>
                    <p className="text-2xl p-3">National Tournaments</p>
                </div>
            </div>
        </section>
    )
}

export default About