import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserService from '../../Service/UserService';

import { SiFacebook } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";


const quotes = [
  "“The best way to find yourself is to lose yourself in the service of others.” – Mahatma Gandhi",
  "“No act of kindness, no matter how small, is ever wasted.” – Aesop",
  "“The best way to not feel hopeless is to get up and do something.” – Barack Obama",
  "“Alone we can do so little; together we can do so much.” – Helen Keller",
];

const ContactUs = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userResponse = await UserService.accountAccess();
    const user_id = userResponse.id;

    // Prepare the form data
    const formData = {
      user_id,
      name,
      email,
      message,
    };

    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:8080/contactUs', formData);

      if (response.status === 200) {
        alert(response.data);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="bg-gray-100 ">

      <div className="relative bg-blue-300 text-black py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 trade-winds">Contact Us</h1>
        <p className="text-xl italic">{quotes[currentQuote]}</p>
      </div>

      {/* Content Section */}
      <div className="px-5 py-8 bg-blue-100">
        <p className="text-black mb-8 text-center text-lg">
          Whether you have a question about our projects, need assistance, or you're interested in getting involved with our initiatives, we’d love to hear from you. Reach out to us using the form below, and we'll get back to you as soon as possible.
        </p>

        <div className='flex  mt-5 justify-center items-center mb-5'>
          <div className="flex gap-10 items-center">
            <a href='www.google.com' className='text-5xl text-blue-800'>
              <SiFacebook />
            </a>
            <a href='#' className='text-5xl text-green-800'>
              <FaWhatsapp />
            </a>
            <a href='#' className='text-5xl text-blue-800'>
              <BsLinkedin />
            </a>
           
          </div>
        </div>


        {/* Form Section */}
        <div className="max-w-xl mx-auto bg-blue-200 p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md font-bold hover:bg-blue-900 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>


        {/* Additional Content */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700">
            We are here to support you in any way we can. Together, we can make a difference!
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Feel free to reach out to us via email at <a href="mailto:info@yourngo.com" className="text-blue-800 underline">info@yourngo.com</a> or call us at <a href="tel:+1234567890" className="text-blue-800 underline">+123-456-7890</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
