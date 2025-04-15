import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


function AddLocation(){
    return(
        <section id="AddLocation" className="flex flex-col items-center">
            <div className="flex flex-col gap-3 p-5 items-center shadow-2xl shadow-gray-400 bg-gray-900 rounded-2xl">
                    <h2 className="text-3xl font-bold text-blue-600 mb-2 ">Add new location</h2>
                    <form action="" className="flex flex-col gap-5 p-5 items-center">
                        <input 
                            id="name"
                            type="text"
                            placeholder="Location Name"
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                        />

                        <input 
                            id="address"
                            type="text"
                            placeholder="Location Address"
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                        />

                        <button
                            type="submit"
                            className="shadow-lg p-2 min-w-64 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600 hover:cursor-pointer"
                        >
                            Submit
                        </button>

                        <Link 
                            to="/Location" 
                            className="flex flex-row items-center text-blue-500 hover:text-white"
                        > 
                            <ArrowLeftIcon className="h-5 w-5" /> Back
                        </Link>
                    </form>
                </div>
        </section>
    )
}

export default AddLocation