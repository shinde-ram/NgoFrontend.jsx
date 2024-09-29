import React from 'react';
import { FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import {Reviews} from './index'
import mainlogoImg from "../../images/logo3.png";
const AboutUs = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-300 py-16 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
          <img
            src={mainlogoImg}
            alt="About Us"
            className="rounded-xl object-cover w-2/3 h-full "
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-20">
          <h2 className="text-5xl font-bold text-blue-800 mb-6">
            About <span className="text-yellow-500">1Saath</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            1Saath is a platform dedicated to bringing together NGOs and donors
            to make a real impact in the world. Our mission is to empower NGOs
            by connecting them with generous donors who are passionate about
            making a difference. Together, we strive to create a better future
            for communities in need.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Since our inception, we have successfully partnered with numerous
            NGOs, helping them reach their goals and expand their efforts. Our
            platform ensures transparency, trust, and seamless interactions
            between NGOs and donors.
          </p>
          <p className="text-lg text-gray-700">
            Join us in our mission to support these incredible organizations and
            create a positive change in the world. Together, we are stronger.
          </p>
        </div>
      </div>
      <hr className="border-0 h-[4px] w-full bg-gradient-to-r from-pink-500 to-yellow-500 " />

      {/* Values Section */}
      <div className="mt-16 text-center">
        <h3 className="text-5xl font-bold text-blue-800 mb-8">Our Core Values</h3>
        <div className="flex flex-wrap justify-center">
          {/* Transparency */}
          <div className="w-full md:w-1/3 p-4">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <FaShieldAlt className="text-yellow-500 text-6xl mb-4" />
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">Transparency</h4>
              <p className="text-gray-700 text-center">
                We believe in building trust through transparent operations and ensuring that every donation makes a real impact.
              </p>
            </div>
          </div>

          {/* Empowerment */}
          <div className="w-full md:w-1/3 p-4">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <FaLightbulb className="text-yellow-500 text-6xl mb-4" />
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">Empowerment</h4>
              <p className="text-gray-700 text-center">
                Empowering NGOs by providing them with the resources and support they need to grow and succeed in their missions.
              </p>
            </div>
          </div>

          {/* Collaboration */}
          <div className="w-full md:w-1/3 p-4">
            <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
              <FaHandshake className="text-yellow-500 text-6xl mb-4" />
              <h4 className="text-2xl font-semibold text-yellow-500 mb-4">Collaboration</h4>
              <p className="text-gray-700 text-center">
                We foster a collaborative environment where NGOs and donors work together to achieve common goals and create meaningful change.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Reviews/>

      <div className="bg-blue-600 py-12 px-8 mt-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Join Us in Making a Difference</h3>
          <p className="text-xl mb-8">Whether you’re an NGO, donor, or volunteer, your support helps us create lasting impact. Get involved today!</p>
          <a
            href="/get-involved"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Get Involved
          </a>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
