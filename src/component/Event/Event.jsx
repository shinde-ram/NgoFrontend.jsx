import React, { useState, useEffect } from 'react';

import BgImg from "../../images/pineventbg.webp";
import { useNavigate } from 'react-router-dom';
import EventService from '../../Service/EventService';

const Event = () => {
  const navigate = useNavigate();
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await EventService.getAllEvent();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      }
    };
    fetchNgos();
  }, []);

  const baseImageURL = 'http://localhost:8080/Events/getPosterimage/'; // Replace with your actual base URL

  return (
    <div className="bg-gray00 min-h-screen p-8 object-fill bg-no-repeat" style={{ backgroundImage: `url(${BgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-5xl font-bold text-center mb-12 rubic-scribble">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-700">
            <img src={`${baseImageURL}${event.event_id}`} alt={event.title} className="w-full h-48 object-cover" />
            <hr className="h-1 w-full bg-red-400 mt-3" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-4">{event.description}</p>
              <p className="text-red-500">{event.date} <span>{false ? "To" : " "}</span></p>
              <p className="text-blue-800 mb-4">{event.venue}</p>
              <div className='flex justify-end items-end '>
                <button
                  onClick={() => navigate(`/events/${event.event_id}`)}
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
