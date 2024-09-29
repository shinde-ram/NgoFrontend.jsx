import React from 'react';

import Img from "../../images/collage.png";
import Img2 from "../../images/pineventbg.webp";
import BgImg from "../../images/pineventbg.webp";
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const navigate = useNavigate();
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Back-to-School Drive 2024',
      description: 'A charity event aimed at providing school supplies to underprivileged children before the new school year.',
      date: 'November 05,2024',
      location: 'Community Center, Delhi',
      image: "../../images/collage.png" // Placeholder image
    },
    {
      id: 2,
      title: 'Community Cleanup',
      description: 'Help us clean up our local parks and streets to make our community a better place.Join us for an evening of fine dining, entertainment, and fundraising to support our mission.',
      date: 'September 10, 2024',
      location: 'Shivajinagr , Pune',
      image: '../../images/eventbg.avif' // Placeholder image
    },
    {
      id: 3,
      title: 'Charity Run',
      description: 'Participate in our annual charity run to raise funds for our various causes.Join us for an evening of fine dining, entertainment, and fundraising to support our mission.',
      date: 'November 5, 2024',
      location: 'Paral, Mumbai',
      image: './images/charityRun.jpg' // Placeholder image
    },
  ];

  return (
    <div className="bg-gray00 min-h-screen p-8 object-fill bg-no-repeat" style={{backgroundImage:`url(${BgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-5xl font-bold text-center mb-12 rubic-scribble">Upcoming Events</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-700">
            <img src={Img2} alt={event.title} className="w-full h-48 object-cover" />
            <hr className="h-1 w-full bg-red-400 mt-3" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-4">{event.description}</p>
              <p className="text-red-500">{event.date} <span>{false ? "To" : " "}</span></p>
              <p className="text-blue-800 mb-4">{event.location}</p>
              <div className='flex justify-end items-end '>
                <button
                onClick={()=>navigate(`/events/${event.id}`)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Know More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
