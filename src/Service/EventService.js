import axios from "axios";

const URL_PATH = "http://localhost:8080/Events";

class EventService {


    createEvent(data) {
        return axios.post(URL_PATH, data);
    }

    getAllEvent() {
        return axios.get(URL_PATH);
    }

    getEventById(id) {
        return axios.get(`${URL_PATH}/${id}`);
    }

    getImage(id) {
        return axios.get(`${URL_PATH}/getPosterimage/${id}`, { responseType: 'blob' });
    }


}

export default new EventService();