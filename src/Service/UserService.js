import axios from 'axios';

const URL_PATH = "http://localhost:8080"; // Backend URL

class UserService {
  // Function to create a user with form data including the profile image
  createUser(data) {
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    fetch('http://localhost:8080/profile', {
      method: 'POST',
      body: data // No need to add headers
    })
    .then(response => response.json())
    .catch(error => console.log('Error:', error));

    /*
    return axios.post(`${URL_PATH}/profile`, data, {
      headers: {
//        'Content-Type': 'multipart/form-data', // Multipart header for file upload
      },
    });*/
  }
}

export default new UserService();
