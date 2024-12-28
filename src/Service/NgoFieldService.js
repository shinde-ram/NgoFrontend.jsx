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
        return axios.get(`${URL_PATH}/Field/getField/${id}`);
    }

    async addRelatedField(ngoId, fieldData) {
      try {
          const formData = new FormData();
          formData.append("ngo_id", ngoId); // Explicitly pass ngo_id
          formData.append("field_name", fieldData.field_name);
          formData.append("field_content", fieldData.field_content);

          // Check if a file exists and append it to the FormData
          if (fieldData.file) {
              formData.append("file_data", fieldData.file);
          }

          // Use axios to send the FormData
          const response = await axios.post(
              `${URL_PATH}/Field`, // POST to match @PostMapping
              formData,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              }
          );
          return response.data; // Return the saved NgoField object
      } catch (error) {
          console.error("Error adding related field:", error);
          throw error; // Rethrow error for component-level handling
      }
  }

    updateRelatedField(ngoId, fieldId, fieldData) {
      try {
        const formData = new FormData();
        formData.append("field_name", fieldData.field_name);
        formData.append("field_content", fieldData.field_content);
    
        // Check if a file exists and append it to the FormData
        if (fieldData.file) {
          formData.append("file_data", fieldData.file);
        }
    
        // Use axios to send the FormData
        const response = axios.put(
          `${URL_PATH}/Field/${ngoId}/related-fields/${fieldId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response; // Return the response data
      } catch (error) {
        console.error("Error updating related field:", error);
        throw error; // Rethrow error for component-level handling
      }
    }

    deleteRelatedField(id){
      return axios.delete(`${URL_PATH}/Field/${id}`);
    }
    
    

}

export default new NgoFieldService;