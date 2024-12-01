import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NgoService from "../../Service/NgoService";

const ViewDonation = () => {
  const { ngo_id } = useParams(); // Get NGO ID from the URL
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await NgoService.getDonations(ngo_id);
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Failed to load donations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [ngo_id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Donations</h1>

      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Donor Name</th>
              <th className="px-4 py-2 border">Amount (₹)</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation.donation_id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{donation.donor_name}</td>
                <td className="px-4 py-2 border">{donation.amount}</td>
                <td className="px-4 py-2 border">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDonation;
