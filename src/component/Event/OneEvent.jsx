import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventService from "../../Service/EventService";
import UserService from "../../Service/UserService";

function OneEvent() {
  const { id } = useParams(); // Event ID from the URL
  const navigate = useNavigate();

  // States
  const [event, setEvent] = useState(null); // Event details
  const [imageSrc, setImageSrc] = useState(null); // Event poster image
  const [showTermsModal, setShowTermsModal] = useState(false); // Terms modal visibility
  const [agreed, setAgreed] = useState(false); // User's agreement to terms
  const [isApplying, setIsApplying] = useState(false); // Registration process status

  // Fetch event details and image on component load
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await EventService.getEventById(id); // Fetch event details
        setEvent(response.data);

        // Fetch event image
        const imageResponse = await EventService.getImage(id);
        const imageURL = URL.createObjectURL(imageResponse.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Error fetching event or image:", error);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle the "Apply Now" button click
  const handleApply = () => {
    setShowTermsModal(true); // Show the Terms modal
  };

  // Handle the user's agreement change
  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };

  // Handle "Accept" button click in Terms modal
  const handleAccept = async () => {
    if (agreed) {
      setIsApplying(true); // Show loading state during registration
      try {
        // Fetch the user's account details
        const userResponse = await UserService.accountAccess();
        const user_id = userResponse.id;

        // Attempt to register the user for the event
        const response = await EventService.registerForEvent(user_id, id);
        if (response.status === 201) {
          alert("You have successfully registered for the event!"); // Success message
        }
      } catch (error) {
        // Handle duplicate registration or other errors
        if (error.response && error.response.status === 409) {
          alert("You have already registered for this event!");
        } else {
          console.error("Error during event registration:", error);
          alert("There was an error registering for the event. Please try again.");
        }
      } finally {
        setShowTermsModal(false); // Close the Terms modal
        setAgreed(false); // Reset agreement checkbox
        setIsApplying(false); // Reset loading state
      }
    }
  };

  // Handle "Cancel" button click in Terms modal
  const handleCancel = () => {
    setShowTermsModal(false);
    setAgreed(false);
  };

  // Return loading state if event is null
  if (!event) {
    return <div className="text-red-500">Loading event details...</div>;
  }

  // Component Render
  return (
    <div className="w-full bg-gray-300 py-10 px-4">
      <div className="bg-white p-6 md:p-8 shadow-xl max-w-4xl mx-auto rounded-lg">
        {/* Event Title and Apply Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
            {event.title}
          </h1>
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Apply Now
          </button>
        </div>

        <hr className="h-1 w-full bg-red-400 mt-3" />

        {/* Event Poster */}
        <img
          src={`http://localhost:8080/Events/getPosterimage/${id}`}
          alt={event.title}
          className="w-full h-64 md:h-96 object-contain mt-3 rounded-lg border-4 border-black"
        />
        <hr className="h-1 w-full bg-red-400 mt-3" />

        {/* Event Details */}
        <div className="mt-6 text-center md:text-left">
          <p className="font-bold">Schedule:</p>
          {event.eventSchedules ? (
            <table className="mb-4 table-auto w-full md:w-1/2 border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Start Time</th>
                  <th className="px-4 py-2 text-left">End Time</th>
                </tr>
              </thead>
              <tbody>
                {event.eventSchedules.map((schedule, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-2">
                      {new Date(schedule.event_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{schedule.start_time}</td>
                    <td className="px-4 py-2">{schedule.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No schedules available</p>
          )}
          <p className="text-gray-700 text-lg mt-2">
            <a href={event.location_link} className="text-blue-700 cursor-pointer">
              <span className="text-black font-semibold">Location:</span> {event.venue} 📍click here
            </a>
          </p>
          <p className="text-gray-700 text-lg mt-4">{event.description}</p>
        </div>

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Terms and Conditions</h2>
              <p className="text-gray-700">
                Changes to the event schedule, and participants will be notified accordingly.
              </p>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="agree"
                  className="mr-2"
                  checked={agreed}
                  onChange={handleAgreementChange}
                />
                <label htmlFor="agree" className="text-gray-700">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                onClick={handleAccept}
                disabled={!agreed || isApplying}
                className={`mt-4 py-2 px-4 rounded-lg shadow-lg font-semibold transition duration-300 ${
                  agreed ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {isApplying ? "Registering.." : "Accept"}
              </button>
              <button
                onClick={handleCancel}
                className="mt-2 text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OneEvent;
