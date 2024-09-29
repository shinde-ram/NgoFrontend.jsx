import axios from 'axios';

const URL_PATH = "http://localhost:8080"; 

class NgoFieldService{
    getAllField(ngo_id){
        return axios.get(`${URL_PATH}/${ngo_id}`);
    }

    getFieldImage(field_id){
        return axios.get(`${URL_PATH}/${field_id}`);
    }
    
    getFieldById(id){
        return axios.get(`${URL_PATH}/field/getField/${id}`);
    }

}

export default new NgoFieldService;