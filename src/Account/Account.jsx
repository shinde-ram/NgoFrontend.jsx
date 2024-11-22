import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";

const Account = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [selectedImage, setSelectedImage] = useState(""); // Selected image URL for modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.accountAccess();
                setUserDetails(response);
            } catch (error) {
                console.error("Error fetching user details:", error);
                navigate("/login");
            }
        };

        fetchUser();
    }, []);

    if (!userDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A374D] to-[#406882]">
                <p className="text-lg font-semibold text-gray-100">Loading account details...</p>
            </div>
        );
    }

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            const response = await fetch("http://localhost:8080/Profile/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                console.log("Logged out successfully");
                navigate("/");
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Function to handle the profile image click
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
                        alt="Profile"
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

            {/* User Details Section */}
            <div className="flex flex-col items-center justify-center pt-[10%] px-6 text-center">
                <h1 className="text-6xl font-bold mb-6 text-black">
                    {userDetails.name.charAt(0).toUpperCase() + userDetails.name.slice(1).toLowerCase()}
                </h1>
                <p className="text-lg mb-12 text-gray-600 italic">
                    Member since: {new Date(userDetails.created_at).toLocaleDateString()}
                </p>

                {/* User Details in Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">Email</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">{userDetails.email}</p>
                    </div>
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">Phone</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">{userDetails.phone}</p>
                    </div>
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">Aadhar Number</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">{userDetails.adhar_no}</p>
                    </div>
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">User ID</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">{userDetails.user_id}</p>
                    </div>
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">Date of Registration</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">
                            {new Date(userDetails.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div className="p-6 bg-[#406882] bg-opacity-80 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition">
                        <p className="text-lg font-semibold text-black">Last Updated</p>
                        <p className="text-2xl font-medium text-[#F8F1F1]">
                            {new Date(userDetails.updated_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal for Profile Picture */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ">
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

export default Account;
