import React, { useEffect, useState, useRef } from "react";
import GalleryNgoService from "../../Service/GalleryNgoService";
import { useParams } from "react-router-dom";

const GalleryEdit = () => {
  const ngoId = useParams();
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await GalleryNgoService.getImages(ngoId);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !imageName) {
      alert("Please enter a name and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("file", selectedFile);

    try {
      await GalleryNgoService.uploadImage(ngoId, formData);
      setShowModal(false);
      setImageName("");
      setSelectedFile(null);
      fetchImages(); // Refresh the images
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await GalleryNgoService.deleteImage(imageId); // Call the delete API
      setImages((prevImages) => prevImages.filter((image) => image.id !== imageId)); // Update state
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Add Image Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Image
      </button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {images.map((image) => (
          <div key={image.id} className="relative p-2">
            <img
            src={`http://localhost:8080${image.imagePath}`}
            
              alt={image.imageName}
              className="w-full h-full object-contain rounded-lg"
            />
            {/* Delete Button */console.log(image.imagePath)   }
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute bottom-2 right-2 bg-red-600 text-white p-1 rounded-xl text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Image Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

            <label className="block mb-2">Image Name:</label>
            <input
              type="text"
              className="border rounded w-full p-2 mb-4"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />

            <label className="block mb-2">Choose Image:</label>
            <input
              type="file"
              className="border p-2 w-full mb-4"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryEdit;
