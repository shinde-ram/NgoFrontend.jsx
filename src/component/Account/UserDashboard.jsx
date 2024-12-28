import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NgoService from "../../Service/NgoService";  // Assume you have a service to fetch NGO details
import UserService from "../../Service/UserService";
import axios from "axios";

const NgoDashboard = () => {
  const [userDetails, setuserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(""); // Selected image URL for modal
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Get ngo_id from the URL

  // Fetch the NGO details when the component is mounted
  useEffect(() => {
    const fetchNgo = async () => {
      try {
        const response = await UserService.getUserById(id);
        setuserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
        navigate("/login");  // Redirect to login if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchNgo();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A374D] to-[#406882]">
        <p className="text-lg font-semibold text-gray-100">Loading NGO details...</p>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-600">
        <p className="text-lg font-semibold text-white">Failed to load NGO details. Please try again.</p>
      </div>
    );
  }

  // Handle Logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/Profile/logout",
        null, // No body is required for this request
        {
          withCredentials: true, // Send cookies/session data with the request
        }
      );
      console.log(response.data); // Logs the response message ("Logged out successfully")
      navigate("/");  // Redirect to homepage after logout

    } catch (error) {
      console.error("Error during logout:", error);
    }

  };

  // Function to handle profile image click (opens modal)
  const handleImageClick = () => {
    setSelectedImage(`http://localhost:8080/Profile/getprofileimage/${userDetails.user_id}`);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(""); // Clear the image when modal closes
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-white relative">
      {/* Top Section: Profile Picture and Logout */}
      <div className="absolute top-6 right-6 flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-20 h-20 cursor-pointer">
          <img
            src={`http://localhost:8080/Profile/getprofileimage/${userDetails.user_id}`}
            alt={`${userDetails.name}'s Profile`}
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            onClick={handleImageClick} // Open modal on click
          />
        </div>
        {/* Logout Button */}
        <button
          className="py-2 px-6 bg-red-500 font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* NGO Details Section */}
      <div className="flex flex-col items-center justify-center pt-[10%] px-6 text-center">
        <h1 className="text-6xl font-bold mb-6 text-black">
          {userDetails.name}
        </h1> <br />

        {/* NGO Details in Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {console.log(userDetails.updated_at.split(" ")[0])}
        {[ 
            { label: "Email", value: userDetails.email },
            { label: "Phone", value: userDetails.phone },
            { label: "Aadhar Number", value: userDetails.adhar_no },
            { label: "NGO ID", value: userDetails.user_id },
            
          ].map((detail, index) => (
            <NgoDetailCard key={index} label={detail.label} value={detail.value} />
          ))}
        </div>
      </div>

      {/* Modal for Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Profile"
              className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// NGO Detail Card Component
const NgoDetailCard = ({ label, value }) => (
  <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
    <p className="text-lg font-semibold text-black">{label}</p>
    <p className="text-2xl font-medium text-[#F8F1F1]">{value}</p>
  </div>
);

export default NgoDashboard;
