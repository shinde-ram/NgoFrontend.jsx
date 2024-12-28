import React, { useState } from 'react';
import Rotate from './Rotate';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import UserBtn from './UserBtn';
import logoImg from "../../images/newlogo2.png";

const Hero = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="h-full md:h-screen flex flex-col md:flex-row items-center bg-white relative">
      {/* Top section with logo and profile icon */}
      <div className="w-full flex justify-between p-4 absolute top-0 left-0 z-20">
        <img
          src={logoImg}
          alt="Logo"
          className="md:w-[10%] sm:w-[15%] w-[20%] sm:ms-20 mt-5 h-[20vh] border-2 border-black rounded-full "
        />
          <div className='flex justify-center items-center'>
        <div className="md:hidden me-4 ">
          {/* Navigation Toggle Button for Mobile */}
          <button
            onClick={toggleNav}
            className="text-white text-3xl focus:outline-none transition-transform duration-300"
          >
            {showNav ? <FaTimes /> : <FaBars />}
          </button>
        </div>
          <UserBtn />
        </div>
      </div>

      {/* Navigation Menu for Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${showNav ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } w-40 text-center bg-gray-600 rounded-md text-white p-4 absolute top-20 right-0 z-20`}
      >
        <ul className="flex flex-col space-y-4 ">
          <li>
            <button onClick={() => { navigate('/'); setShowNav(false); }}>Home</button>
          </li>
          <li>
            <button onClick={() => { navigate('/list'); setShowNav(false); }}>List</button>
          </li>
          <li>
            <button onClick={() => { navigate('/events'); setShowNav(false); }}>Event</button>
          </li>
          <li>
            <button onClick={() => { navigate('/about'); setShowNav(false); }}>About Us</button>
          </li>
          <li>
            <button onClick={() => { navigate('/impact'); setShowNav(false); }}>Our Impact</button>
          </li>
          <li>
            <button onClick={() => { navigate('/contact'); setShowNav(false); }}>Contact Us</button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-500 via-blue-500 to-blue-500 pt-[35%] md:pt-0">
        {/* Left Side - NGO Info */}
        
        <div className="text-white flex flex-col justify-center items-center w-full sm:w-[80%] px-8 md:px-20 md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:text-left text-black">
            Empower Communities, Support NGOs
          </h1>
          <p className="text-base md:text-lg mb-4 md:mb-6 md:text-left text-gray-800">
            Join our mission to make a difference. Learn about the NGOs we support, and find out how you can contribute to impactful causes.
          </p>
          <p className="text-base md:text-lg md:text-left text-gray-800">
            Together, we can create a positive change in the world. Discover the stories of those who have already made a difference.
          </p>
        </div>

        {/* Rotate Component (visible on md and above) */}
        <div>
          <Rotate />
        </div>

        {/* Buttons for larger screens */}
        <div className="absolute right-[38%] bottom-7 z-10 hidden md:flex space-x-5">
          <button
            onClick={() => navigate("/register/ngo")}
            className="bg-sky-500 border-2 border-black text-black text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition transform  hover:scale-105 ease-in-out duration-500"
          >
            Register Your NGO
          </button>
          <button
            onClick={() => navigate("/List")}
            className="ease-in-out duration-500 bg-transparent border border-blue-300 text-black text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:bg-sky-500 hover:border-black hover:scale-105"
          >
            View NGOs
          </button>
        </div>

        {/* Buttons for smaller screens */}
        <div className="flex flex-col md:hidden mt-[33%] sm:mt-[7%]">
          <p className="text-blue-500 text-3xl text-center">
            Donate <span className="text-yellow-500 font-bold text-4xl">4</span>a Better World
          </p>
          <hr className="border-t-2 border-red-700 my-4" />
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/List")}
              className="bg-yellow-400 text-black text-base font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:bg-yellow-600 hover:scale-105"
            >
              Register Your NGO
            </button>
            <button
              onClick={() => navigate("/List")}
              className="bg-transparent border border-white text-white text-base font-semibold py-3 px-6 rounded-lg shadow-lg transition transform hover:bg-yellow-600 hover:text-black hover:scale-105"
            >
              View NGOs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;




