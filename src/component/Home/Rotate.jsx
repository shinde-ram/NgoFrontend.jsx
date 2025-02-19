import React, { useEffect, useState } from 'react';
import { FaChartLine, FaInfoCircle, FaCalendarAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import { RiFileList2Fill } from "react-icons/ri";

const navItemsBig = ['OurImpact', 'About', 'Events', "NGO's", 'Home', 'ContactUs',];
const navItemsLogo = [FaChartLine, FaInfoCircle, FaCalendarAlt, RiFileList2Fill, FaHome, FaEnvelope];
const navItemsPath = ['OurImpact', 'About', 'Events', "list", '', 'ContactUs',]

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
        <div className="absolute w-full h-full rounded-full "></div>

        {/* Small Circle */}
        <div className="absolute w-[97%] left-[3%] bottom-[1.5%] h-[97%] rounded-full  z-5"></div>
        <div className="absolute w-full h-full rounded-full border-8 border-yellow-500"></div>

        {/* Small Circle */}
        <div className="absolute w-[97%] left-[1%] bottom-[1.5%] h-[97%] rounded-full border-8 border-yellow-500  z-5"></div>

        {/* Big Circle Items */}
        {navItemsBig.map((item, index) => {
          const IconComponent = navItemsLogo[index];
          const IconPath = navItemsPath[index];
          return (
            <div
              key={index}
              style={{
                transform: `rotate(${rotationAngle + index * 60}deg) translate(14.5em) rotate(-${rotationAngle + index * 60}deg)`,
              }}
              className="z-9 absolute text-black px-2 py-4 rounded-md w-20 h-20 object-fill hover:cursor-pointer font-bold text-center top-[45%] left-[45%]
               transition-transform duration-1000 ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            >
              <a href={`/${IconPath.toLowerCase()}`} className="w-full h-full  ">
                <IconComponent className='w-full h-full text-black' />
                <p className='absolute bottom-8 text-right right-16 max-w-24  rounded-s-lg px-2  text-black bg-gradient-to-r to-yellow-200 from-red-500 '>{item}</p>
              </a>
              <p className='absolute bottom-8 text-right right-16 max-w-24  rounded-s-lg px-2  text-black bg-gradient-to-r to-yellow-200 from-red-500'> {item}</p>
              {/* <p className='absolute bottom-8 text-right right-16 max-w-24  rounded-s-lg px-2  text-black bg-gradient-to-r to-blue-500 via-blue-500 from-blue-200 '> {item}</p> */}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rotate;
