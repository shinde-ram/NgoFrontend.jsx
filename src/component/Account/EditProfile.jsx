import { useState, useEffect } from "react";
import NgoService from "../../Service/NgoService";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ngo, setNgo] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    async function fetchNgo() {
      const response = await NgoService.getNgoById(id);
      setNgo(response.data);
    }
    fetchNgo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await NgoService.updateNgo(id, ngo);
    if (response) {
      setShowSuccessModal(true); 
    } else {
      alert("Something went wrong!");
    }
  };
  const closeModal = () => 
    {
      setShowSuccessModal(false);
      navigate(`/account/ngo/${id}`)
    }

  return (


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h2 className="text-4xl font-bold text-center text-gradient bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
            Edit NGO Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={ngo.name}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={ngo.description}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={ngo.email}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-500"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={ngo.phone}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
                />
              </div>

              {/* Address Input */}
              <div>
                <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={ngo.address}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Update Successful!
            </h2>
            <p>Your NGO details have been successfully updated.</p>
            <button
              onClick={closeModal}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default EditProfile;
