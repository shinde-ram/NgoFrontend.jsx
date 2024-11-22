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

  //Submit the rating
  submitRating(ngo_id, rating) {
    return axios.post(`${URL_PATH}/NgoReview`, {
        rating: rating,
        ngo_id: ngo_id,  // Ensure ngo_id is passed
    }, {
      withCredentials: true, 
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

getAverageRating(ngoId) {
  return axios.get(`${URL_PATH}/NgoReview/average/${ngoId}`);
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
