import React from 'react';
import { useNavigate } from 'react-router-dom';
import Img from "../../images/waybg.avif";

function Register() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center" 
        style={{backgroundImage:`url(${Img})`, backgroundSize: 'cover'}}
>
            <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3 w-11/12">
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-700 whitespace-nowrap">
                        You want to register as..
                    </h1>
                </div>

                <div className="flex justify-around items-center">
                    <button
                        className="py-3 px-6 bg-green-500 text-white text-lg md:text-xl font-semibold rounded-lg transition duration-300 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none shadow-md hover:shadow-lg"
                        onClick={() => navigate("/register/ngo")}
                    >
                        NGO
                    </button>

                    <button
                        className="py-3 px-6 bg-blue-500 text-white text-lg md:text-xl font-semibold rounded-lg transition duration-300 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-md hover:shadow-lg"
                        onClick={() => navigate("/register/user")}
                    >
                        Donor
                    </button>
                </div>

                <div className="mt-8 text-center text-gray-500">
                    <p className="text-sm md:text-base">Join our mission to make a difference!</p>
                </div>
            </div>
        </div>
    );
}

export default Register;
