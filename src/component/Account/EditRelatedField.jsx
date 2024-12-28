import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NgoService from "../../Service/NgoService";
import NgoFieldService from "../../Service/NgoFieldService";

const EditRelatedField = () => {
  const { id } = useParams(); // Get NGO ID from the URL
  const [relatedFields, setRelatedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [currentField, setCurrentField] = useState(null); // Current field for edit
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for delete

  const baseImageURL = 'http://localhost:8080/Field/getFieldImage/';


  // Fetch related fields when component mounts
  useEffect(() => {
    const fetchRelatedFields = async () => {
      try {
        const response = await NgoService.getRelatedFields(id);
        setRelatedFields(response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedFields();
  }, [id]);

  // Handle Delete Field
  const handleDeleteField = async (field_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this field?");
    if (!confirmDelete) return;

    try {
      await NgoFieldService.deleteRelatedField(field_id);
      setRelatedFields((prevFields) =>
        prevFields.filter((field) => field.field_id !== field_id)
      );

      alert("Field deleted successfully!");
    } catch (error) {
      console.error("Error deleting field:", error);
      alert("Failed to delete field. Please try again.");
    } 
  };

  // Open Modal for Add or Edit
  const openModal = (field = null) => {
    setCurrentField(field);
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentField(null);
  };

  // Handle Save (Add or Edit)
  const handleSaveField = async (fieldData) => {
    try {
      if (currentField) {
        // Edit an existing field
        const response = await NgoFieldService.updateRelatedField(id, currentField.field_id, fieldData);
        setRelatedFields((prevFields) =>
          prevFields.map((field) =>
            field.field_id === currentField.field_id ? { ...field, ...fieldData } : field
          )
        );
        if (response) {
          alert("Field updated successfully!");
        }
      } else {
        // Add a new field
        const response = await NgoFieldService.addRelatedField(id, fieldData);
        console.log(response);
        setRelatedFields((prevFields) => [...prevFields, response]);
        alert("Field added successfully!");
      }
    } catch (error) {
      console.error("Error saving field:", error);
      alert("Failed to save field. Please try again.");
    } finally {
      closeModal();
    }
  };
  

  // Show Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  // Show Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Related Fields</h1>

      {/* Add New Related Field Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Add New Field
        </button>
      </div>

      {/* Related Fields Cards */}
      {relatedFields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedFields.map((field) => (
            <div
              key={field.field_id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
                <img src={`${baseImageURL}${field.field_id}`} alt={`${field.field_id}`} className="rounded-lg object-fill h-60 p-1" />
              {/* Field Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {field.field_name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {field.field_content || "No description provided."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex justify-between items-center border-t">
                <button
                  onClick={() => openModal(field)}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteField(field.field_id)}
                  className={`px-3 py-1 ${isDeleting ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                    } text-white rounded-lg`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No related fields found.</p>
      )}

      {/* Modal */}
      {modalOpen && (
        <Modal
          field={currentField}
          onClose={closeModal}
          onSave={handleSaveField}
        />
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ field, onClose, onSave }) => {
  const [fieldName, setFieldName] = useState(field?.field_name || "");
  const [fieldContent, setFieldContent] = useState(field?.field_content || "");
  const [fieldFile, setFieldFile] = useState(null); // Store selected file
  const [previewImage, setPreviewImage] = useState(field?.file_path); // Preview image

  const handleSubmit = () => {
    if (!fieldName || !fieldContent) {
      alert("Field name and description are required!");
      return;
    }

    // Pass the field data along with the file
    onSave({
      field_name: fieldName,
      field_content: fieldContent,
      file: fieldFile,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{field ? "Edit Field" : "Add Field"}</h2>

        {/* Field Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Field Name</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Field Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={fieldContent}
            onChange={(e) => setFieldContent(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md h-32"
          ></textarea>
        </div>

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFieldFile(file); // Store file
                setPreviewImage(URL.createObjectURL(file)); // Preview image
              }
            }}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditRelatedField;
