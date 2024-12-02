import React, { useState } from 'react';
import EventService from '../../Service/EventService';
import { useNavigate } from 'react-router-dom';

function AddEvent({ ngoId }) {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location_link: '',
    venue: '',
    fees: '',
    poster: null,
    schedule: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name+" name and value  "+value)
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      poster: e.target.files[0],
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...eventData.schedule];
    updatedSchedules[index] = {
      ...updatedSchedules[index],
      [field]: value,
    };
    setEventData((prevData) => ({
      ...prevData,
      schedule: updatedSchedules,
    }));
  };

  const addSchedule = () => {
    setEventData((prevData) => ({
      ...prevData,
      schedule: [...prevData.schedule, { event_date: '', start_time: '', end_time: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("\nNgo id is "+ngoId);
      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('location_link', eventData.location_link);
      formData.append('venue', eventData.venue);
      formData.append('fees', eventData.fees);
      formData.append('schedule', JSON.stringify(eventData.schedule));
      formData.append('poster', eventData.poster);  
      formData.append('ngo_id', ngoId);  
      console.log("Event before sending :- ",eventData);
      const response = await EventService.addEvent(formData);
      console.log('Event Created:', response.data);
      alert("Event Created Successfully :)");
      navigate("/events");
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event description"
            required
          />
        </div>

        {/* Event Location Link */}
        <div className="mb-4">
          <label htmlFor="location_link" className="block text-sm font-semibold text-gray-700 mb-2">Location Link</label>
          <input
            type="url"
            id="location_link"
            name="location_link"
            value={eventData.location_link}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location link (optional)"
          />
        </div>

        {/* Event Venue */}
        <div className="mb-4">
          <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter venue"
            required
          />
        </div>

        {/* Event Fees */}
        <div className="mb-4">
          <label htmlFor="fees" className="block text-sm font-semibold text-gray-700 mb-2">Event Fees</label>
          <input
            type="number"
            id="fees"
            name="fees"
            value={eventData.fees}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event fees"
            required
          />
        </div>

        {/* Event Poster */}
        <div className="mb-4">
          <label htmlFor="poster" className="block text-sm font-semibold text-gray-700 mb-2">Event Poster</label>
          <input
            type="file"
            id="poster"
            name="poster"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Event Schedules */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Event Schedules</label>
          {eventData.schedule.map((schedule, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="date"
                value={schedule.event_date}
                onChange={(e) => handleScheduleChange(index, 'event_date', e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={schedule.start_time}
                onChange={(e) => handleScheduleChange(index, 'start_time', e.target.value + ':00')}
                className="w-1/3 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={schedule.end_time}
                onChange={(e) => handleScheduleChange(index, 'end_time', e.target.value + ':00')}
                className="w-1/3 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSchedule}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Add Schedule
          </button>
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Submit Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
