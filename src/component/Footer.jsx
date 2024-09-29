// Footer.jsx
import React from 'react';
import { SiFacebook } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">About Us</h4>
            <p className="text-sm">
              1Saath is dedicated to connecting NGOs with donors to foster <br /> meaningful support and collaboration.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-300">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-300">About Us</a>
              </li>
              <li>
                <a href="/list" className="hover:text-yellow-300">Lists</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-300">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <p className="text-sm mb-2">Modern Collage Department of Computer Science</p>
            <p className="text-sm mb-2">Email: contact@1saath.org</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>

          {/* Social Media Section */}
        </div>
        <div className='flex  mt-5 items-center'>
          <h4 className="text-lg font-bold mb-2 me-8">Follow Us</h4>
          <div className="flex space-x-4 items-center">
            <div>
              <SiFacebook />
            </div>
            <div>
              <BsLinkedin />
            </div>
            <div>
              <FaWhatsapp />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-700 pt-4 mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 1Saath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
