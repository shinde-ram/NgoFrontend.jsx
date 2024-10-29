import axios from 'axios';

const URL_PATH = "http://localhost:8080/Profile/account"; // Backend URL

class UserService {
  // Function to create a user with form data including the profile image
  
  accountAccess = () => {
    return axios.get('http://localhost:8080/Profile/account', { withCredentials: true });
};
}

export default new UserService();
