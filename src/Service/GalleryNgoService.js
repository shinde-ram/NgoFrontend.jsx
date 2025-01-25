import axios from "axios";

const URL_PATH = "http://localhost:8080/gallery";

class GalleryNgoService {
  // Upload image
  uploadImage(ngoId, formData) {
    return axios.post(`${URL_PATH}/upload/${ngoId.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // Get all images for an NGO
  getImages(ngoId) {
    return axios.get(`${URL_PATH}/${ngoId.id}`);
  }

  // Delete an image by ID
  deleteImage(imageId) {
    return axios.delete(`${URL_PATH}/image/${imageId}`);
  }
}

export default new GalleryNgoService();
