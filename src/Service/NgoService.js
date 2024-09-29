import axios from 'axios';

const URL_PATH = "http://localhost:8080"; 

class NgoService {
  // Fetch all NGOs
  getAllNgo() {
    return axios.get(URL_PATH);
  }

  getImage(id) {
    return axios.get(`${URL_PATH}/getprofileimage/${id}`, { responseType: 'blob' });
  }
  

  // Create a new NGO (handle file uploads)
  createngo(formData) {
    return axios.post(URL_PATH, formData );
  }

  // Fetch an NGO by ID
  getNgoById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }

  // Optional: Add other methods for updating, deleting, etc.
  // Example for deleting an NGO
  // deleteNgo(id) {
  //   return axios.delete(`${URL_PATH}/${id}`);
  // }

  // Example for updating an NGO
  // updateNgo(id, ngo) {
  //   return axios.put(`${URL_PATH}/${id}`, ngo);
  // }
}

export default new NgoService();
