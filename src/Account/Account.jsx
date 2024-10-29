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
                console.log(response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Optional: handle errors such as unauthorized access by navigating to login
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                }
            }
        };

        fetchUser();
    }, [navigate]);

    if (!userDetails) {
        return <p>Loading...</p>;  // Show loading state while fetching data
    }

    return (
        <div>
            <h1>Account Page</h1>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Aadhar Number:</strong> {userDetails.adharNo}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default Account;
