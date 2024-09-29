import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NgoService from '../../Service/NgoService';
import ListTop from './ListTop';
import bgImg from "../../images/listbg.avif"

const List = () => {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await NgoService.getAllNgo();
        setNgos(response.data);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      }
    };
    fetchNgos();
  }, []);

  const baseImageURL = 'http://localhost:8080/getprofileimage/'; // Replace with your actual base URL

  return (
    <div className="bg-gray-300 mx-auto pb-5 p-5">
      {/* Full-screen Background Section */}
      <div
        className="relative bg-cover bg-center h-[20vh] md:h-[40vh]"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white pt-[2%] flex items-center">
          <p className="md:px-20 text-xl md:text-3xl md:mt-5 lg:text-5xl font-bold text-yellow-500 trade-winds w-1/2">
            Small help together makes better life.
          </p>
        </div>
      </div>
      <br />
      <hr className="h-[5px] w-full bg-red-500" />

      {/* Title */}
      <h2 className="text-5xl rubic-scribble text-red-400 font-extrabold mb-8 pt-5 text-center">
        Our partner NGOs
      </h2>

      {/* NGO List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {ngos.map((ngo) => (
          <Link
            key={ngo.ngo_id}
            className="bg-gray-200 border-2 border-black rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all ease-in-out duration-500"
            to={`${ngo.ngo_id}`}
          >
            <img
              src={`${baseImageURL}${ngo.ngo_id}`} // Using the baseImageURL and ngo ID to fetch the image
              alt={ngo.name}
              className="w-full h-48 object-cover bg-center p-2 "
            />
            <hr className="h-[3px] w-full bg-red-300" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-center">{ngo.name}</h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{ngo.description}</p>
              
              {/* Related fields display with wrapping */}
              {ngo.ngoFields && ngo.ngoFields.length > 0 && (
                <div className="mt-4">
                  <div className="text-gray-700 flex flex-wrap gap-2">
                    {ngo.ngoFields.map((field) => (
                      <span
                        key={field.field_id}
                        className="text-md bg-blue-200 text-black py-1 rounded-full px-3 mb-2 flex items-center"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <span className="mr-2">▶</span> {/* You can replace this symbol if needed */}
                        {field.field_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="text-end pe-5 relative bottom-2">
              <button className="px-2 rounded-md text-blue-900 font-bold">More...</button>
            </div>
          </Link>
        ))}
      </div>
      <ListTop />
    </div>
  );
};

export default List;
