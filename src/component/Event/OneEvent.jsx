import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventService from "../../Service/EventService";
import Img from "../../images/collage.png";

function OneEvent() {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  // Dummy event data
  // const events = [
  //   {
  //     id: 1,
  //     title: 'Fundraising Gala',
  //     description:
  //       'Join us for an evening of fine dining, entertainment, and fundraising to support our mission.',
  //     date: 'October 15, 2024',
  //     fees: 100,
  //     location: 'https://goo.gl/maps/XfEjw5GZo62F5qUd7',
  //     image: '../../images/logo3.png', // Placeholder image
  //   },
  //   {
  //     id: 2,
  //     title: 'Community Cleanup',
  //     description:
  //       'Help us clean up our local parks and streets to make our community a better place.',
  //     date: 'September 10, 2024',
  //     fees: '',
  //     location: 'San Francisco, CA',
  //     image: './images/cleaning.jpg', // Placeholder image
  //   },
  //   {
  //     id: 3,
  //     title: 'Charity Run',
  //     description:
  //       'Participate in our annual charity run to raise funds for our various causes.',
  //     date: 'November 5, 2024',
  //     fees: 20,
  //     location: 'Chicago, IL',
  //     image: './images/charityRun.jpg', // Placeholder image
  //   },
  // ];


  const [event, setEvent] = useState([]);
  const [imageSrc, setImageSrc] = useState(null); // State for image source

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await EventService.getEventById(id);
        setEvent(response.data);

        // Fetch the image
        const imageResponse = await EventService.getImage(id);
        const imageURL = URL.createObjectURL(imageResponse.data); // Create URL from blob
        setImageSrc(imageURL); // Set the image URL as the source for the image
      } catch (error) {
        console.error("Error fetching NGO or image:", error);
      }
    };

    fetchEvent();
  }, [id]);

  // Find the event based on the id from the URL
  // const event = events.find((e) => e.id === parseInt(id));

  // State management for modal and terms acceptance
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  // Check if event exists
  if (!event) {
    return <div className="text-red-500">Event not found!</div>;
  }

  // Handle "Apply" button click
  const handleApply = () => {
    setShowTermsModal(true);
  };

  // Handle agreement checkbox
  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };

  // Handle "Accept" button click
  const handleAccept = () => {
    if (agreed) {
      setShowTermsModal(false);

      // If the event has fees, navigate to the payment gateway
      if (event.fees) {
        setShowPaymentGateway(true);
        navigate(`/paymentgateway/${event.fees}`);
      } else {
        alert("This is a free event. You are now registered!");
      }
    }
  };

  return (
    <div className='w-full bg-gray-300 py-10'  >

      <div className="bg-white p-8 shadow-xl max-w-4xl mx-auto rounded-lg ">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{event.title}</h1>
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
          className="w-full h-full object-contain mt-3 rounded-lg border-8 border-black"
        />
        <hr className="h-1 w-full bg-red-400 mt-3" />

        <div className="mt-6">
          <p className="text-gray-700 text-lg">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-gray-700 text-lg mt-2">
            <a href={event.location} className="text-blue-700">
              <span className="text-black font-semibold">Location:</span> 📍click here
            </a>
          </p>
          <p className='text-red-900 text-lg mt-2'><span className='text-black font-semibold'>Fees : Rs.</span>{event.fees}</p>
          <p className="text-gray-700 text-lg mt-4">{event.description}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 w-full">
          <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
          <p className="text-gray-700">
            Please note that if this is a paid event, no refunds will be issued once
            the registration is completed. All sales are final, and non-attendance does
            not qualify for a refund. We reserve the right to make changes to the event
            schedule, and participants will be notified accordingly.
          </p>
        </div>

        {/* Modal for Terms and Conditions */}
        {showTermsModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
              <p className="text-gray-700">
                Please note that if this is a paid event, and no refunds will be issued once
                the registration is completed. All sales are final, and non-attendance
                does not qualify for a refund. We reserve the right to make changes to
                the event schedule, and participants will be notified accordingly.
              </p>

              {/* Agreement Checkbox */}
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

              {/* Show "Accept" button if the user has agreed */}
              <button
                onClick={handleAccept}
                disabled={!agreed}
                className={`mt-4 py-2 px-4 rounded-lg shadow-lg font-semibold transition duration-300 ${agreed
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
              >
                Accept
              </button>

              {/* Close Modal */}
              <button
                onClick={() => setShowTermsModal(false)}
                className="mt-2 text-red-500 hover:underline ms-3"
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
