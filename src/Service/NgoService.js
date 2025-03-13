import axios from 'axios';

const URL_PATH = "http://localhost:8080"; 

class NgoService {
  // Fetch all NGOs
  getAllNgo() {
    return axios.get(URL_PATH);
  }


  getTotalDonation(id){
    return axios.get(`${URL_PATH}/Transactions/total_donation/${id}`);
  }

  getDonations(id){
    console.log("thus ykuug"+id );

    return axios.get(`${URL_PATH}/Transactions/donationDetails/${id}`);
  }

  getImage(id) {
    
    return axios.get(`${URL_PATH}/getprofileimage/${id}`, { responseType: 'blob' });
  }

  getCount(){
    return axios.get(`${URL_PATH}/count`);
  }
  

  // Create a new NGO (handle file uploads)
  createngo(formData) {
    return axios.post(URL_PATH, formData );
  }

  // Fetch an NGO by ID
  getNgoById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }

  //Fetch events by an ngo id
  getEventsByNgoId(id){
    return axios.get()`${URL_PATH}/Events/${id})`;
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

//Fetch average rating of a ngo
getAverageRating(ngoId) {
  return axios.get(`${URL_PATH}/NgoReview/average/${ngoId}`);
}

//Fetch related fields of a ngo 
getRelatedFields(ngoId){
  return axios.get(`${URL_PATH}/Field/${ngoId}`);
}

uploadGalleryImage(ngo_id, formData) {
  return axios.post(`${URL_PATH}/gallery/upload/${ngo_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

getGalleryImages(ngo_id) {
  return axios.get(`${URL_PATH}/gallery/${ngo_id}`);
}




  // Example for updating an NGO
  updateNgo(id, ngo) {
    return axios.put(`${URL_PATH}/${id}`, ngo);
  }
}

export default new NgoService();
