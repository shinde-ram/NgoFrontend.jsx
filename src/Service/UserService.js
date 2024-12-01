import axios from 'axios';

const URL_PATH = 'http://localhost:8080/Profile'; // Backend URL

class UserService {

  // Fetch an USER by ID
  getUserById(id) {
    return axios.get(`${URL_PATH}/${id}`);
  }
  
  accountAccess = async () => {
    const response = await fetch('http://localhost:8080/Profile/account', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
    });
    console.log(response);
    return response.json();
};

  createUser = (formData) =>{
    return axios.post(URL_PATH,formData);
  }


}

export default new UserService();
