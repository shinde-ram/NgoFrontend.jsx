import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import EventService from '../../Service/EventService';
import EventImg from "../../images/eventregisterbg.jpg";

const EventRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [schedules, setSchedules] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [currentStep, setCurrentStep] = useState(1); // Track current step

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    );
    setSchedules(updatedSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { date: '', startTime: '', endTime: '' }]);
  };

  const removeSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const eventData = { ...data, schedules };
      console.log('Event Data:', eventData);

      const response = await EventService.createEvent(eventData);
      if (response.ok) {
        console.log('Event successfully registered');
        navigate('/events'); // Redirect to event list page
      } else {
        console.error('Failed to register event');
      }
    } catch (error) {
      console.error('Error during event registration:', error);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 p-6 bg-no-repeat" 
    style={{backgroundImage:`url(${EventImg})`, backgroundSize: 'cover'}}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Register Your Event</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <div>
                <label className="block text-gray-700 font-medium">Event Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Event title is required' })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter event title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  {...register('description', { required: 'Event description is required' })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Describe the event"
                  rows="4"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <button
                type="button"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out mt-6"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Venue and Location */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div>
                <label className="block text-gray-700 font-medium">Venue</label>
                <input
                  type="text"
                  {...register('venue', { required: 'Venue is required' })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter event venue"
                />
                {errors.venue && <p className="text-red-500 text-sm">{errors.venue.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Location Link</label>
                <input
                  type="text"
                  {...register('location_link', { required: 'Location link is required' })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter Google Maps link"
                />
                {errors.location_link && <p className="text-red-500 text-sm">{errors.location_link.message}</p>}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="w-2/5 py-2 bg-gray-400 text-white font-bold rounded-lg shadow-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="w-2/5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Event Schedule */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
                <FaCalendarAlt className="mr-2 text-blue-600" /> Event Schedule
              </h3>

              {schedules.map((schedule, index) => (
                <div key={index} className="flex space-x-4 items-center mb-4">
                  <input
                    type="date"
                    value={schedule.date}
                    onChange={(e) => handleScheduleChange(index, 'date', e.target.value)}
                    className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="time"
                    value={schedule.startTime}
                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                    className="w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                    className="w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeSchedule(index)}
                    >
                      <FaTimesCircle className="h-6 w-6" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="mt-4 text-blue-600 hover:text-blue-800 flex items-center"
                onClick={addSchedule}
              >
                <FaPlusCircle className="mr-2" /> Add Another Schedule
              </button>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="w-2/5 py-2 bg-gray-400 text-white font-bold rounded-lg shadow-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-2/5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventRegister;
