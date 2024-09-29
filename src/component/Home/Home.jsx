import React, { useState, useEffect } from 'react';
import Header from '../Header';
import {Hero , Worksteps} from './index'
import ListTop from '../List/ListTop';
import Footer from '../Footer';
import visionImg from "../../images/collage.png";
import CountNgo from './CountNgo';

const Home = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.8; // 80% of the viewport height
      setShowHeader(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-black'>
      {/* Hero Section */}
      <Hero />

      {/* Header (Sticky with transition effect) */}
      <div
        className={`md:flex hidden fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out transform ${showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
      >
        <Header />
      </div>

      {/* Content below the Header */}
      <div className={`${showHeader ? 'md:ms-[15%] ' : 'ms-0'} transition-all duration-500 ease-out  `}>
          <hr className="border-0 h-[2px] w-full mt-4 bg-red-800" />
        <div className='flex flex-col items-center justify-center bg-gray-200 text-black'>
          <p className='md:text-6xl text-4xl trade-winds pt-6 font-bold text-center '>Our Vision</p>
          <hr className="border-0 h-[4px] w-2/3 mt-4 bg-gradient-to-r from-pink-500 to-yellow-500  " />
          <img src={visionImg} alt='collage image' className='md:p-10 md:w-2/3 w-full bg-red-300 my-5 shadow-xl ' />
          <hr className="border-0 h-[4px] w-2/3 mb-6 bg-gradient-to-r from-yellow-500 to-pink-500  " />
        </div>
        <hr className="border-0 h-[2px] w-full  bg-red-800" />
        <CountNgo/>
        <hr className="border-0 h-[2px] w-full  bg-red-800" />
        <ListTop />
        <hr className="border-0 h-[3px] w-full  bg-red-800" />
        <Worksteps />
        <hr className="border-0 h-[3px] w-full  bg-red-800" />
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
