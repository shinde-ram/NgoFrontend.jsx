import React, { useState, useEffect } from 'react';
import BgImg from "../../images/pineventbg.webp";
import { useNavigate } from 'react-router-dom';
import EventService from '../../Service/EventService';

const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("live"); // Default tab is "live"
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await EventService.getAllEvent();
        setEvents(response.data);
        console.log(response.data);
        categorizeEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const categorizeEvents = (eventsData) => {
    const today = new Date();
    const todays = [];
    const upcoming = [];
    const completed = [];

    eventsData.forEach((event) => {
      const eventDate = new Date(event.eventSchedules[0]?.event_date);

      if (eventDate.toDateString() === today.toDateString()) {
        todays.push(event);
      } else if (eventDate > today) {
        upcoming.push(event);
      } else {
        completed.push(event);
      }
    });

    setTodaysEvents(todays);
    setUpcomingEvents(upcoming);
    setCompletedEvents(completed);
  };

  const baseImageURL = "http://localhost:8080/Events/getPosterimage/";

  const renderEvents = (eventList) => {
    return eventList.length > 0 ? (
      eventList.map((event) => (
        <div
          key={event.event_id}
          className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-700"
        >
          <img
            src={`${baseImageURL}${event.event_id}`}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <hr className="h-1 w-full bg-red-400 mt-3" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-4">{event.description}</p>
            <p className="text-red-500">{event.date}</p>
            <p className="text-blue-800 mb-4">{event.venue}</p>
            <div className="flex justify-end items-end">
              <button
                onClick={() => navigate(`/events/${event.event_id}`)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No events available in this category.</p>
    );
  };

  return (
    <div
      className="bg-gray-300 min-h-screen p-8 object-fill bg-no-repeat"
      // style={{
      //   backgroundImage: `url(${BgImg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <h1 className="text-5xl font-bold text-center mb-12 rubic-scribble ">
        Events
      </h1>

      {/* Tab Menu */}
      <div className="flex justify-cente mb-8 space-x-4">
        <button
          className={`px-6 py-3 rounded-lg text-white ${
            activeTab === "live" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("live")}
        >
          Today's Events
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-white ${
            activeTab === "upcoming" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-white ${
            activeTab === "completed" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Events
        </button>
      </div>

      {/* Event Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === "live" && renderEvents(todaysEvents)}
        {activeTab === "upcoming" && renderEvents(upcomingEvents)}
        {activeTab === "completed" && renderEvents(completedEvents)}
      </div>
    </div>
  );
};

export default Event;
