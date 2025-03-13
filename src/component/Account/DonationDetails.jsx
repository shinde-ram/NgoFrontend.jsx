import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventService from "../../Service/EventService";
import AddEvent from "./AddEvent";

const DonationDetails = () => {
    const { id } = useParams(); // ngo_id from URL
    const navigate = useNavigate();
    const [events, setEvents] = useState([]); // List of events
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" }); // State for a new event
    const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // Event to edit
    const [showEditModal, setShowEditModal] = useState(false); // Show edit modal
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Show success modal



    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await EventService.getEventsByNgoId(id);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                navigate("/login"); // Redirect to login if there's an error
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [id, navigate]);

    const handleUpdateEvent = async () => {
        try {
            // Ensure times are in HH:mm:ss format
            const updatedEvent = {
                ...selectedEvent,
                eventSchedules: selectedEvent.eventSchedules.map((schedule) => ({
                    ...schedule,
                    start_time: schedule.start_time.length === 5 ? `${schedule.start_time}:00` : schedule.start_time,
                    end_time: schedule.end_time.length === 5 ? `${schedule.end_time}:00` : schedule.end_time,
                })),
            };
    
            const response = await EventService.updateEvent(selectedEvent.event_id, updatedEvent);
            if (response) {
                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.event_id === selectedEvent.event_id ? response : event
                    )
                );
                setShowEditModal(false);
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Error updating event. Please try again.");
        }
    };
    

    // Function to handle deleting an event
    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (!confirmDelete) return;

        try {
            const response = await EventService.deleteEvent(eventId);
            if (response) {
                setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId)); // Remove from list
                setShowSuccessDeleteModal(true);
            } else {
                alert("Something went wrong!");
            }

        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        navigate(`/account/ngo/${id}`)
    }

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true);
    };

    // Function to close the edit modal
    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedEvent(null);
    };

    // Function to close the success modal
    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        navigate(`/account/ngo/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1A374D] to-[#406882]">
                <p className="text-lg font-semibold text-gray-100">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8 text-black">
            <h1 className="text-4xl font-bold mb-6">Manage Events</h1>

            {/* List of Events */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event.event_id}
                            className="p-6 bg-white shadow-lg rounded-lg flex-col flex md:flex-row gap-6 justify-between items-center"
                        >
                            <div className="w-full">
                                <div className="w-[80%]">
                                    <h3 className="text-xl font-bold">{event.title}</h3>

                                    <p className="text-gray-600 mb-2">{event.description}</p>
                                    <p className="text-gray-700 mb-3"><span className="font-bold">Location :</span>  {event.venue} <span className="text-red"><a href={event.location_link} className="text-blue-600 ms-3">       Click here</a>📍</span></p>
                                </div>
                                <div className="w-full">

                                    {/* Schedule Table */}
                                    {event.eventSchedules.length > 0 ? (
                                        <table className="table-auto w-full md:w-1/2 border border-gray-300">
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
                                    )}</div>
                            </div>

                            <div className="flex flex-col gap-3 justify-center">
                                <button
                                    onClick={() => handleEditEvent(event)}
                                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteEvent(event.event_id)}
                                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No events found. Add your first event!</p>
                )}
            </div>
            <div className="mt-10">

                <AddEvent ngoId={id} />
            </div>


            {/* Back to Dashboard */}
            <button
                onClick={() => navigate(`/account/ngo/${id}`)}
                className="mt-8 py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
            >
                Back to Dashboard
            </button>
            {showSuccessDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-green-600 mb-4">
                            Event Delete Successful!
                        </h2>
                        <p>Your Event details have been successfully deleted.</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
           {showEditModal && selectedEvent && (
   <div className="fixed inset-0 bg-black bg-opacity-80 flex  justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-xl mx-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form>
                {/* Event Details */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedEvent.title}
                        onChange={(e) =>
                            setSelectedEvent((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedEvent.description}
                        onChange={(e) =>
                            setSelectedEvent((prev) => ({ ...prev, description: e.target.value }))
                        }
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedEvent.venue}
                        onChange={(e) =>
                            setSelectedEvent((prev) => ({ ...prev, venue: e.target.value }))
                        }
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Location Link</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedEvent.location_link}
                        onChange={(e) =>
                            setSelectedEvent((prev) => ({ ...prev, location_link: e.target.value }))
                        }
                    />
                </div>

                {/* Event Schedules */}
                <h3 className="text-lg font-semibold mb-2">Event Schedules</h3>
                {selectedEvent.eventSchedules.map((schedule, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium mb-2">Schedule {index + 1}</label>
                        <div className="flex flex-col gap-2">
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg p-2"
                                value={schedule.event_date}
                                onChange={(e) => {
                                    const updatedSchedules = [...selectedEvent.eventSchedules];
                                    updatedSchedules[index].event_date = e.target.value;
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        eventSchedules: updatedSchedules,
                                    }));
                                }}
                            />
                                <div className="flex gap-5">
                            <input
                                type="time"
                                className="w-1/2  border border-gray-300 rounded-lg p-2"
                                value={schedule.start_time}
                                onChange={(e) => {
                                    const updatedSchedules = [...selectedEvent.eventSchedules];
                                    updatedSchedules[index].start_time = e.target.value;
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        eventSchedules: updatedSchedules,
                                    }));
                                }}
                            />
                            <input
                                type="time"
                                className="w-1/2 border border-gray-300 rounded-lg p-2"
                                value={schedule.end_time}
                                onChange={(e) => {
                                    const updatedSchedules = [...selectedEvent.eventSchedules];
                                    updatedSchedules[index].end_time = e.target.value;
                                    setSelectedEvent((prev) => ({
                                        ...prev,
                                        eventSchedules: updatedSchedules,
                                    }));
                                }}
                            />

                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Schedule */}
                <button
                    type="button"
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-2"
                    onClick={() => {
                        setSelectedEvent((prev) => ({
                            ...prev,
                            eventSchedules: [
                                ...prev.eventSchedules,
                                { event_date: "", start_time: "", end_time: "" },
                            ],
                        }));
                    }}
                >
                    Add Schedule
                </button>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        onClick={handleUpdateEvent}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        onClick={closeEditModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
)}


            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-green-600 mb-4">
                            Event Updated Successfully!
                        </h2>
                        <button
                            onClick={closeSuccessModal}
                            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            
            
        </div>
    );
};

export default DonationDetails;
