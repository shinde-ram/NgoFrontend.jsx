import React, { useState } from 'react';
import NgoService from '../../Service/NgoService';
import SuccessPopup from './successPopUp';
import Img from "../../images/eventregisterbg.jpg";

function NgoRegister() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    website: '',
    profilePhoto: null,
    location_link: '',
    registered_by: '',
    adhar_no: '',
    founder_name: '',
    founded_on: '',
    category: '',
    profile_path: '',
    profile_type: '',
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
      profile_type: e.target.files[0] ? e.target.files[0].type : '',
    });
  };

  const handleNext = () => {
    if (step < 8) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'profilePhoto') {
        form.append(key, formData[key]);
      }
    });
    if (formData.profilePhoto) {
      form.append('profile', formData.profilePhoto);
      form.append('profile_type', formData.profile_type);
    }

    try {
      await NgoService.createngo(form);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error registering NGO:', error);
    }
  };

  const renderFields = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label className="block text-sm font-semibold">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter NGO Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>

            <div>
              <label className="block text-sm font-semibold">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Describe your NGO"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Founder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="founder_name"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Founder Name"
                value={formData.founder_name}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <label className="block text-sm font-semibold">
                Aadhar No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="adhar_no"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Aadhar No"
                value={formData.adhar_no}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Founded On <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="founded_on"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.founded_on}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Category</label>
              <select
                name="category"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Human Rights NGOs">Human Rights NGO</option>
                <option value="Environmental NGOs">Environmental NGO</option>
                <option value="Health NGOs">Health NGO</option>
                <option value="Educational NGOs">Educational NGO</option>
                <option value="Development and Aid NGOs">Development and Aid NGO</option>
                <option value="Child and Youth NGOs">Child and Youth NGO</option>
                <option value="Women’s Rights and Gender Equality NGOs">Women’s Rights Ngo</option>
                <option value="Cultural NGOs">Cultural NGO</option>
                <option value="Humanitarian NGOs">Humanitarian NGO</option>
                <option value="Animal Rights and Welfare NGOs">Animal Rights and Welfare NGO</option>
                <option value="Advocacy NGOs">Advocacy NGO</option>
                <option value="Religious or Faith-Based NGOs">Religious or Faith-Based NGO</option>
                <option value="Trade and Industry NGOs">Trade and Industry NGO</option>
                <option value="Research and Policy NGOs">Research and Policy NGO</option>
                <option value="Indigenous and Minority Rights NGOs">Indigenous and Minority Rights NGO</option>
              </select>
            </div>
          </>
        );
      case 4:
        return (
          <>

            <div>
              <label className="block text-sm font-semibold">Location Link (Optional)</label>
              <input
                type="text"
                name="location_link"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Location Link"
                value={formData.location_link}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Website (Optional)</label>
              <input
                type="url"
                name="website"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter Website URL"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Profile Photo <span className="text-red-500">*</span></label>
              <input
                type="file"
                name="profilePhoto"
                className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleFileChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2x mx-auto  h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${Img})`, backgroundSize: 'cover' }}
    > 
    <div className='text-green-900 font-semibold px-3 md:top-[45%] absolute w-full md:w-[20%] md:left-[17%] top-[10%] text-center'>
        <p className="text-lg mb-6 ">
          Join our community of organizations making a positive impact in the world.
          Register your NGO today to start connecting with potential donors and volunteers.
        </p>
      </div>
      <h2 className="text-5xl font-bold mb-4 rubic-scribble  p-3 rounded-md text-center">NGO Registration</h2>

      <form onSubmit={handleSubmit} className="bg-gray-200  bg-opacity-80 w-[85%]  md:w-[45%]  p-6 rounded-lg shadow-md space-y-6 max-h-[70vh]"
      >
        {renderFields()}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {isSuccess && <SuccessPopup />}
    </div>
  );
}

export default NgoRegister;
