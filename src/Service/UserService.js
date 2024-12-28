import axios from 'axios';

const URL_PATH = 'http://localhost:8080/Profile'; // Backend URL

class UserService {

  // Fetch an USER by ID
  getUserById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }
  
  accountAccess = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Profile/account', {
        withCredentials: true, // Include cookies with the request
      });
      return response.data; // Return the parsed JSON directly
    } catch (error) {
      console.error('Error accessing account:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data); // Log error response from server
      }
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  createUser = (formData) =>{
    return axios.post(URL_PATH,formData);
  }


}

export default new UserService();
