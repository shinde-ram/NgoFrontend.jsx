import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import NgoService from '../../Service/NgoService';
import NgoFields from './NgoFields';

function OneNgo() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [ngo, setNgo] = useState({});
  const [imageSrc, setImageSrc] = useState(null); // State for image source

  useEffect(() => {
    const fetchNgo = async () => {
      try {
        const response = await NgoService.getNgoById(id);
        setNgo(response.data);

        // Fetch the image
        const imageResponse = await NgoService.getImage(id);
        const imageURL = URL.createObjectURL(imageResponse.data); // Create URL from blob
        setImageSrc(imageURL); // Set the image URL as the source for the image
      } catch (error) {
        console.error("Error fetching NGO or image:", error);
      }
    };

    fetchNgo();
  }, [id]);

  if (!ngo) {
    return <p className="text-center text-red-500">NGO not found</p>;
  }

  return (
    <>
      <ScrollToTop />
      <div className="bg-gradient-to-b from-blue-50 to-gray-200 shadow-lg rounded-lg p-8 md:p-12 lg:p-16 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <img
              src={imageSrc} // Set the fetched image blob URL here
              alt={ngo.name}
              className="w-3/4 md:w-[80%] h-60 rounded-3xl mx-auto md:mx-0 object-cover shadow-md"
            />
            <h2 className="text-4xl font-extrabold mt-6">{ngo.name}</h2>
            <p className="text-lg text-blue-600 mt-2">{ngo.address}</p>
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <div className="grid grid-cols-2  lg:grid-cols-3 gap-3 w-full">
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center transform hover:scale-105 transition duration-300 ease-in-out">
                <h4 className="text-xl font-semibold text-gray-700">Founded</h4>
                <p className="text-2xl font-bold text-blue-500 mt-2 whitespace-nowrap">{ngo.founded_on}</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center transform hover:scale-105 transition duration-300 ease-in-out">
                <h4 className="text-xl font-semibold text-gray-700">Category</h4>
                <p className="text-xl font-bold text-green-500 mt-2 ">{ngo.category}</p>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center justify-center transform hover:scale-105 transition duration-300 ease-in-out">
                <h4 className="text-xl font-semibold text-gray-700 ">Rating</h4>
                <p className="text-2xl font-bold text-yellow-500 mt-2 ">{ngo.rating}</p>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
              {
                ngo.website ? (
                  <a
                  href={ngo.website}
                  className="text-lg w-1/2 text-white bg-blue-700 hover:bg-blue-800 shadow-md rounded-full py-4 text-center transform hover:scale-105 transition duration-300 ease-in-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Our Website
                </a>
                ):(<div></div>)
              }
             

              <button
              onClick={()=>navigate(`/paymentgateway/${ngo.ngo_id}`)}
               className="crazy-donate-button whitespace-nowrap bg-red-500 text-white font-bold py-3 px-3 md:px-6 rounded-full shadow-lg text-xl w-full">
              💰Donate Now
              </button>

            </div>

          </div>
        </div>

        <div className="mt-8">
          <p className="text-xl text-gray-700 w-full md:">
            {ngo.description}
          </p>
        </div>

        <NgoFields />

        <div className="mt-12 flex justify-center">
          <div className="bg-white w-full md:w-3/4 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h3>
            <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {ngo.email}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Phone:</strong> {ngo.phone}</p>
            <a target="_blank"
              rel="noopener noreferrer"
              href={ngo.location_link}
              className="text-lg text-blue-700 mb-2"><strong className='text-black'>Location:</strong> Click here to Location</a>

          </div>
        </div>
      </div>
    </>
  );
}

export default OneNgo;
