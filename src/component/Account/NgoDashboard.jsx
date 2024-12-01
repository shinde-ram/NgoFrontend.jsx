import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import NgoService from "../../Service/NgoService";

const NgoDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ngo_id from the URL
    const [ngoDetails, setNgoDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageSrc, setImageSrc] = useState(null); // State for image source
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    useEffect(() => {
        const fetchNgo = async () => {
            try {
                const response = await NgoService.getNgoById(id);
                setNgoDetails(response.data);
                // Fetch the image
                const imageResponse = await NgoService.getImage(id);
                const imageURL = URL.createObjectURL(imageResponse.data); // Create URL from blob
                setImageSrc(imageURL); // Set the image URL as the source for the image
            } catch (error) {
                console.error("Error fetching NGO details:", error);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNgo();
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A374D] to-[#406882]">
                <p className="text-lg font-semibold text-gray-100">
                    Loading NGO details...
                </p>
            </div>
        );
    }

    if (!ngoDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-600">
                <p className="text-lg font-semibold text-white">
                    Failed to load NGO details. Please try again.
                </p>
            </div>
        );
    }


    const handleLogout = async () => {
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
        } finally {
            setShowLogoutModal(false); // Close the modal
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-6 md:flex justify-around items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl text-center font-bold text-black mb-4">
                            {ngoDetails.name}
                        </h1>
                        <p className="text-black text-center font-semibold">Since : <span className="text-gray-500">{ngoDetails.founded_on.slice(0, 4)}</span></p>
                    </div>
                    <img
                        src={imageSrc} // Set the fetched image blob URL here
                        alt={ngoDetails.name}
                        className="w-full p-5 md:p-0 md:w-[30%]  object-contain  "
                    />
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2"><strong>Description:</strong></p>
                    <p className={`text-sm sm:text-base ${isExpanded ? 'text-gray-700' : 'text-gray-500'}`}>
                        {isExpanded ? ngoDetails.description : ngoDetails.description.slice(0, 150)}
                    </p>
                    {ngoDetails.description.length > 150 && (
                        <p
                            className="mt-2 text-blue-500 cursor-pointer font-semibold hover:text-blue-700 transition duration-200"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "Show Less" : "Read More..."}
                        </p>
                    )}
                </div>


                <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg max-w-5xl mx-auto mt-12">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center">Your Information</h3>

                    {/* Name and Description in the Same Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb- sm:mb-1">
                        {/* Name Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 sm:mb-8">
                            <p className="sm:text-lg font-medium text-gray-700 mb-2"><strong>Name</strong></p>
                            <p className="text-lg sm:text-xl text-gray-700 ">{ngoDetails.name}</p>
                        </div>

                        {/* Location Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 sm:mb-8">
                            <p className="sm:text-lg font-medium text-gray-700 mb-2"><strong>Location</strong></p>
                            <a
                                href={ngoDetails.location_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition duration-200 text-xs sm:text-sm md:text-lg"
                            >
                                {ngoDetails.location_link}
                            </a>
                        </div>
                    </div>

                    {/* Email and Phone in the Same Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* Email Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-2"><strong>Email</strong></p>
                            <p className="text-lg sm:text-xl text-gray-900">{ngoDetails.email}</p>
                        </div>

                        {/* Phone Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-2"><strong>Phone</strong></p>
                            <p className="text-lg sm:text-xl text-gray-900">{ngoDetails.phone}</p>
                        </div>
                    </div>

                    {/* Address and Website in the Same Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* Address Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-2"><strong>Address</strong></p>
                            <p className="text-lg sm:text-xl text-gray-900">{ngoDetails.address}</p>
                        </div>

                        {/* Website Block */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-2"><strong>Website</strong></p>
                            <a
                                href={ngoDetails.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition duration-200 text-lg sm:text-xl"
                            >
                                {ngoDetails.website}
                            </a>
                        </div>
                        {/* Description Block */}
                    </div>




                    {/* Edit Profile Link */}
                    <div className="text-center">
                        <Link
                            to={`/ngo/edit-profile/${ngoDetails.ngo_id}`}
                            className="inline-block py-2 px-6 bg-blue-500 text-white font-semibold text-lg sm:text-xl rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>


                {/* Metrics and Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 mt-7">
                    {/* Total Events */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <h3 className="text-xl font-semibold text-black text-center">Total Events</h3>
                        <p className="text-3xl font-bold text-purple-500 text-center  py-3" >
                            {ngoDetails.events.length}
                        </p>
                        <button className="w-full md:w-1/2 whitespace-nowrap py-2 px-6 bg-blue-500 text-white font-semibold text-lg sm:text-sm rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => navigate(`/ngo/${ngoDetails.ngo_id}/events`)}>

                            Manage All Events
                        </button>
                    </div>

                    {/* Total Donations */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <h3 className="text-xl font-semibold text-black text-center">Total Donations</h3>
                        <p className="text-3xl font-bold text-purple-500 text-center  py-3" >
                            ₹{ngoDetails.total_donations || 0}
                        </p>
                        <button className="w-full md:w-1/2 whitespace-nowrap py-2 px-6 bg-blue-500 text-white font-semibold text-lg sm:text-sm rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => navigate(`/ngo/donations/${ngoDetails.ngo_id}`)}>

                            Edit Donation Info
                        </button>
                    </div>

                    {/* Related Fields */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
                        <h3 className="text-xl font-semibold text-black text-center">Related Fields</h3>
                        <p className="text-3xl font-bold text-purple-500 text-center  py-3" >
                            { ngoDetails.ngoFields.length }

                        </p>
                        <button className="w-full md:w-1/2 whitespace-nowrap px-3 py-2 bg-blue-500 text-white font-semibold text-lg sm:text-sm rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => navigate(`/ngo/related-fields/${ngoDetails.ngo_id}`)}>
                            Edit Related Fields
                        </button>
                    </div>
                </div>


                {/* Logout Button */}
                <div className="mt-8">
                    <button
                        onClick={() => setShowLogoutModal(true)} // Show the modal
                        className="w-full md:w-auto p-3 bg-red-500 hover:bg-red-600 text-black font-semibold rounded-lg transition-colors text-center"
                    >
                        Logout
                    </button>
                </div>

                {/* Logout Confirmation Modal */}
                {showLogoutModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                Are you sure you want to logout?
                            </h2>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleLogout} // Confirm logout
                                    className="py-2 px-6 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={() => setShowLogoutModal(false)} // Cancel logout
                                    className="py-2 px-6 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NgoDashboard;
