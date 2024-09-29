import React, { useState, useEffect, useRef } from 'react';
import { FaHandsHelping, FaUsers } from 'react-icons/fa';
import Confetti from 'react-confetti'; // Import the confetti library

const CountNgo = () => {
  const [ngoCount, setNgoCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const ref = useRef();

  // Function to animate counting
  const animateValue = (start, end, duration, setCount) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * (end - start) + start), end);
      setCount(currentCount);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateValue(0, 200, 2000, setNgoCount);
      animateValue(0, 100, 2000, setUserCount);
    }
  }, [isVisible]);

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col md:flex-row items-center justify-center py-16 w-full relative">
      {/* Confetti Celebration Effect */}
      {isVisible && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false} // It will stop after one-time burst
          numberOfPieces={2000} // More pieces for a bigger effect
          gravity={0.1}
        />
      )}

      <div className="w-full md:w-1/2 p-4 ">
        {/* NGO Count Card */}
        <div className="transform hover:scale-105 transition-transform duration-500 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-center relative overflow-hidden ">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <FaHandsHelping className="w-full h-full text-white" />
          </div>
          <h3 className="text-6xl font-extrabold text-white mb-4 animate-slide-in-down">
            {ngoCount}
          </h3>
          <p className="text-2xl text-white font-semibold">Registered NGOs</p>
          <div className="mt-6">
            {/* Animated Line */}
            <span className="block bg-white h-1 w-full mx-auto rounded line-animation"></span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4 ">
        {/* User Count Card */}
        <div className="transform hover:scale-105 transition-transform duration-500 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-8 text-center relative overflow-hidden ">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <FaUsers className="w-full h-full text-white" />
          </div>
          <h3 className="text-6xl font-extrabold text-white mb-4 animate-slide-in-down">
            {userCount}
          </h3>
          <p className="text-2xl text-white font-semibold">Registered Users</p>
          <div className="mt-6">
            {/* Animated Line */}
            <span className="block bg-white h-1 w-full mx-auto rounded line-animation"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountNgo;
