import React, { useState } from 'react';
import { FaUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function UserBtn() {
  const navigate = useNavigate();
  const isLoggedIn = false; // Modify this based on your authentication logic
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    // Add logout logic here
  };

  return (
    <div className="relative">
      <div className="flex mt-6 md:mt-0 md:mb-10">
        <div className="relative">
          <div className='flex flex-col items-center md:me-6'>
            <FaUserCircle
              className="text-4xl text-black cursor-pointer items-center transition duration-300 transform hover:scale-125 hover:text-purple-800 shadow-lg"
              onClick={toggleDropdown}
            />
            <p className='text-black mt-1'>Profile</p>
          </div>

          {/* Fancy Dropdown menu */}
          <div
            className={`flex flex-col transition-all duration-500 ease-in-out transform origin-top-right ${
              showDropdown ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            } w-36 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white py-4 absolute top-12 right-0 z-20 shadow-2xl border-2 border-gray-200`}
          >
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 p-2 text-gray-100 hover:bg-purple-700 transition-all duration-300 rounded-md"
                >
                  <FaSignInAlt className="text-white" />
                  <span>Log Out</span>
                </button>
                <div className="whitespace-nowrap p-2 text-gray-100 hover:bg-purple-700 transition-all duration-300 rounded-md">
                  You Donated
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setShowDropdown(false);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 text-gray-100 hover:bg-purple-700 transition-all duration-300 rounded-md"
                >
                  <FaSignInAlt className="text-white" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setShowDropdown(false);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 text-gray-100 hover:bg-purple-700 transition-all duration-300 rounded-md"
                >
                  <FaUserPlus className="text-white" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

export default UserBtn;
