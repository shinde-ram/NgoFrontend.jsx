import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import defaultProfile from "../../images/blankprofile.webp"; // Placeholder profile image

function UserBtn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfile); // Default profile image
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await UserService.logout(); // Implement this method in your `UserService`
      setIsLoggedIn(false);
      setProfileImage(defaultProfile); // Reset profile image on logout
      setShowDropdown(false);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.accountAccess(); // Fetch user details
        if (response) {
          setIsLoggedIn(true);
          if (response.role === "user") {
            const imageUrl = `http://localhost:8080/Profile/getprofileimage/${response.id}`;
            setProfileImage(imageUrl); // Set user profile image
          } else if (response.role === "ngo") {
            const imageUrl = `http://localhost:8080/getprofileimage/${response.id}`;
            setProfileImage(imageUrl); // Set NGO profile image
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative">
      <div className="flex mt-6 md:mt-0 md:mb-10">
        <div className="relative">
          {/* Profile Image */}
          <div className="flex flex-col items-center md:me-6">
            <img
              src={profileImage}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover cursor-pointer transition duration-300 transform hover:scale-125 shadow-lg border-4 border-black"
              onClick={toggleDropdown}
            />
            <p className="text-black mt-1">Profile</p>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`flex flex-col transition-all duration-500 ease-in-out transform origin-top-right ${
              showDropdown ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
                    navigate("/login");
                    setShowDropdown(false);
                  }}
                  className="flex items-center justify-center space-x-2 p-2 text-gray-100 hover:bg-purple-700 transition-all duration-300 rounded-md"
                >
                  <FaSignInAlt className="text-white" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
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
