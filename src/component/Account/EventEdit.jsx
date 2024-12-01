import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventService from "../../Service/EventService";
import AddEvent from "./AddEvent";

const EventEdit = () => {
    const { id } = useParams(); // ngo_id from URL
    const navigate = useNavigate();
    const [events, setEvents] = useState([]); // List of events
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" }); // State for a new event

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

   

    // Function to handle deleting an event
    const handleDeleteEvent = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (!confirmDelete) return;

        try {
            await NgoService.deleteEvent(eventId);
            setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId)); // Remove from list
        } catch (error) {
            console.error("Error deleting event:", error);
        }
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
                            <div>
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p className="text-gray-600">{event.description}</p><br />
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
                            <button
                                onClick={() => handleDeleteEvent(event.event_id)}
                                className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No events found. Add your first event!</p>
                )}
            </div>
            <div className="mt-10">

            <AddEvent ngoId={id}/>
            </div>


            {/* Back to Dashboard */}
            <button
                onClick={() => navigate(`/account/ngo/${id}`)}
                className="mt-8 py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default EventEdit;
