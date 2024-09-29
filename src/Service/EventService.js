import axios from "axios";

const URL_PATH = "http://localhost:8080/events";

class EventService{


    createEvent(data){
        return axios.post(URL_PATH,data);
    }
}

export default new  EventService();