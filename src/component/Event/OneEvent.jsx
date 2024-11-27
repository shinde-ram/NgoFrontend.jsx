import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventService from "../../Service/EventService";

function OneEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await EventService.getEventById(id);
        setEvent(response.data);

        const imageResponse = await EventService.getImage(id);
        const imageURL = URL.createObjectURL(imageResponse.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Error fetching event or image:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleApply = () => {
    setShowTermsModal(true);
  };

  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleAccept = () => {
    if (agreed) {
      setShowTermsModal(false);
      if (event.fees) {
        navigate(`/paymentgateway/${event.fees}`);
      } else {
        alert("You are now registered!");
      }
    }
  };

  if (!event) {
    return <div className="text-red-500">Event not found!</div>;
  }

  return (
    <div className="w-full bg-gray-300 py-10 px-4">
      <div className="bg-white p-6 md:p-8 shadow-xl max-w-4xl mx-auto rounded-lg">
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

        <img
          src={`http://localhost:8080/Events/getPosterimage/${id}`}
          alt={event.title}
          className="w-full h-64 md:h-96 object-contain mt-3 rounded-lg border-4 border-black"
        />
        <hr className="h-1 w-full bg-red-400 mt-3" />

        <div className="mt-6 text-center md:text-left">
          <p className="text-gray-700 text-lg">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-gray-700 text-lg mt-2">
            <a href={event.location} className="text-blue-700">
              <span className="text-black font-semibold">Location:</span> 📍click here
            </a>
          </p>
          <p className="text-gray-700 text-lg mt-4">{event.description}</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Terms and Conditions</h2>
          <p className="text-gray-700">
            Changes to the event schedule, and participants will be notified accordingly.
          </p>
        </div>

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
                disabled={!agreed}
                className={`mt-4 py-2 px-4 rounded-lg shadow-lg font-semibold transition duration-300 ${
                  agreed
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => setShowTermsModal(false)}
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
