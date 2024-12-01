import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NgoService from "../../Service/NgoService";

const EditRelatedField = () => {
  const { id } = useParams(); // Get NGO ID from the URL
  const [relatedFields, setRelatedFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRelatedFields = async () => {
      try {
        console.log(id);
        const response = await NgoService.getRelatedFields(id);
        setRelatedFields(response.data);
      } catch (error) {
        console.error("Error fetching related fields:", error);
        setError("Failed to load related fields. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedFields();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

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
        <Link
          to={`/ngo/${id}/related-fields/add`}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Add New Field
        </Link>
      </div>

      {/* Related Fields Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Field Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {relatedFields.map((field, index) => (
              <tr key={field.field_id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{field.field_name}</td>
                <td className="px-4 py-2 border">{field.field_content}</td>
                <td className="px-4 py-2 border">
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <Link
                      to={`/ngo/${id}/related-fields/edit/${field.field_id}`}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteField(field.field_id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Delete handler for related fields
  async function handleDeleteField(field_id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this field?");
    if (!confirmDelete) return;

    try {
      await NgoService.deleteRelatedField(id, field_id);
      setRelatedFields((prevFields) =>
        prevFields.filter((field) => field.field_id !== field_id)
      );
      alert("Field deleted successfully!");
    } catch (error) {
      console.error("Error deleting field:", error);
      alert("Failed to delete field. Please try again.");
    }
  }
};

export default EditRelatedField;
