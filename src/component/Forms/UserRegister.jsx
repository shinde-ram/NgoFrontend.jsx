import React, { useState } from 'react';
import SuccessPopup from './successPopUp'; // Popup for successful registration
import UserService from '../../Service/UserService'; // Service to handle API calls
import Img from "../../images/eventregisterbg.jpg"; // Background image for the form

function UserRegister() {
  const [isSuccess, setIsSuccess] = useState(false); // State to handle success popup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    adhar_no: '',
    profile_image: '',  // File input for profile image
  });

  const [step, setStep] = useState(1); // State to track the current step

  // Handle changes in form fields except for file input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change for the profile image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_image: e.target.files[0], // Get the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(); // Create a FormData object to handle file uploads

    // Append all form data including file input
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('password', formData.password);
    form.append('adhar_no', formData.adhar_no);

    // Append the profile photo
    if (formData.profile_image) {
      form.append('profile', formData.profile_image);
    }

    try {
      await UserService.createUser(form); // Call UserService to post data
      setIsSuccess(true); // Show success popup on successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // Function to move to the next step
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  // Function to move to the previous step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };


  return (
    <>
      {isSuccess && <SuccessPopup who={"u"} />}

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Img})` }} // Set the background image
      >
        <div className='text-green-900 font-semibold px-3 md:top-[40%] absolute w-full md:w-[20%] md:left-[17%] top-[5%] text-center'>
          <p className="text-lg mb-6 ">
            Empower Change with Us!
            Join hands with thousands of dedicated NGOs.
            Register today and unlock your path to creating a better world.</p>
            <p className='text-lg mb-6'>Together, we can make an impact one step at a time!</p>

          
        </div>
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full mx-5 md:w-[45%] h-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 rubic-scribble">
            User Registration {/* Title */}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Name & Email */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Step 2: Password & Phone */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Step 3: Aadhar No & Profile Photo */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Aadhar No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="adhar_no"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter Aadhar No"
                    value={formData.adhar_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Profile Photo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="profile_image"
                    className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Step Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Previous
                </button>
              )}

              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Next
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                  onClick={handleSubmit}
                >
                  Register User
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
