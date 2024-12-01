import axios from "axios";

const URL_PATH = "http://localhost:8080/Events";

class EventService {

  // Method to create a new event
  addEvent(ngoId, formData) { 
     return axios.post(`${URL_PATH}/${ngoId}/add-event`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  };

  // Fetch events by NGO ID
  getEventsByNgoId(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }

  // Fetch event details by event ID
  getEventById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }

  // Fetch the poster image of a specific event
  getImage(id) {
    return axios.get(`${URL_PATH}/getPosterimage/${id}`, { responseType: 'blob' });
  }
}

export default new EventService();
