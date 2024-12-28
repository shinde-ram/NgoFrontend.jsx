import axios from "axios";

const URL_PATH = "http://localhost:8080/Events";

class EventService {

  // Method to create a new event
  addEvent(formData) { 
     return axios.post(`${URL_PATH}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  };

  // Fetch events by NGO ID
  getEventsByNgoId(id) {
    return axios.get(`${URL_PATH}/ngo/${id}`);
  }

  // Fetch event details by event ID
  getEventById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }

  // Fetch the poster image of a specific event
  getImage(id) {
    return axios.get(`${URL_PATH}/getPosterimage/${id}`, { responseType: 'blob' });
  }

  getAllEvent(){
    return axios.get(`${URL_PATH}`);    
  }

  registerForEvent(userId, eventId) {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("eventId", eventId);
  
    return axios.post(`${URL_PATH}/EventParticipant`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
  
  

  updateEvent = async (eventId, eventDetails) => {
    try {
      console.log(eventDetails);
      const response = await axios.put(
        `${URL_PATH}/${eventId}`,
        eventDetails
      );
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  deleteEvent(eventId){
    try {
      const response = axios.delete(`${URL_PATH}/${eventId}`);
      return response; // Return success message from backend
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
      throw error; // Propagate the error for further handling
    }
  }
}

export default new EventService();
