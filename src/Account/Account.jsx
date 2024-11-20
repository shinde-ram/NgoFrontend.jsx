import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';

const Account = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.accountAccess();
                console.log(response);
                setUserDetails(response);
            } catch (error) {
                console.error('Error fetching user details:', error);
                navigate('/login');
            }
        };

        fetchUser();
    }, []);

    if (userDetails == undefined) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/Profile/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logged out successfully');
                navigate('/');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex items-center justify-center p-6 bg-gray-300 min-h-screen">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl flex flex-col items-center">
                {/* Profile Image */}
                <div className="w-32 h-32 mb-4">
                    <img
                        src={`http://localhost:8080/Profile/getprofileimage/${userDetails.user_id}`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                    />
                </div>
                {/* User Details */}
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">{userDetails.name}</h1>
                <p className="text-sm text-gray-500 mb-6">User Account Information</p>

                <div className="text-center space-y-2 w-full">
                    <p className="text-lg text-gray-700"><strong>Email:</strong> {userDetails.email}</p>
                    <p className="text-lg text-gray-700"><strong>Phone:</strong> {userDetails.phone}</p>
                    <p className="text-lg text-gray-700"><strong>Aadhar Number:</strong> {"xxxx-xxxx-"+(userDetails.adhar_no).slice(10)}</p>
                </div>

                {/* Logout Button */}
                <button
                    className="mt-6 w-3/4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Account;
