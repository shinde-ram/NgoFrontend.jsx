import axios from 'axios';

const URL_PATH = 'http://localhost:8080/Profile'; // Backend URL

class UserService {
  // Function to create a user with form data including the profile image
  
  accountAccess = async () => {
    const response = await fetch('http://localhost:8080/Profile/account', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies
    });
    console.log("Inside userService and trying to see the response\n");
    console.log(response);
    return response.json();
};

  createUser = (formData) =>{
    return axios.post(URL_PATH,formData);
  }
}

export default new UserService();
