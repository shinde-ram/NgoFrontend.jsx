import React, { useEffect, useState } from 'react';
import { FaChartLine, FaInfoCircle, FaCalendarAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import { RiFileList2Fill } from "react-icons/ri";

const navItemsBig = ['OurImpact', 'About', 'Events', "NGO's", 'Home', 'ContactUs',];
const navItemsLogo = [FaChartLine, FaInfoCircle, FaCalendarAlt, RiFileList2Fill, FaHome, FaEnvelope];

const Rotate = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle(prevAngle => prevAngle + 60); // Rotate by 60 degrees every interval
    }, 2000); // 2-second interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden justify-end items-center hidden md:flex">
      <div className="relative w-[30em] h-[30em] transform translate-x-[60%]">
        {/* Big Circle */}
        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-blue-900 via-purple-600 to-sky-300"></div>

        {/* Small Circle */}
        <div className="absolute w-[97%] left-[3%] bottom-[1.5%] h-[97%] rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 z-5"></div>

        {/* Big Circle Items */}
        {navItemsBig.map((item, index) => {
          const IconComponent = navItemsLogo[index];
          return (
            <div
              key={index}
              style={{
                transform: `rotate(${rotationAngle + index * 60}deg) translate(14.5em) rotate(-${rotationAngle + index * 60}deg)`,
              }}
              className="z-9 absolute text-black px-2 py-4 rounded-md w-20 h-20 object-fill hover:cursor-pointer font-bold text-center top-[45%] left-[45%]
               transition-transform duration-1000 ease-in-out bg-gradient-to-bl from-blue-700 to-teal-500"
            >
              <a href={`/${item.toLowerCase()}`} className="w-full h-full flex items-center justify-center ">
                <IconComponent className='w-full h-full text-gray-300' />
              </a>
              <p className='absolute bottom-8 text-right right-16 max-w-24  rounded-s-lg px-2  text-black bg-gradient-to-r to-blue-500 via-purple-600 from-blue-200 '> {item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rotate;
