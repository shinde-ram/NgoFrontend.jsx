import React, { useState } from "react";
import { FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import mainlogoImg from "../../images/newlogo2.png";
import Reviews from "./Reviews";
import axios from "axios";
import UserService from "../../Service/UserService";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    content: "",
    ngoId: "",
    userId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    let updatedReviewData= {};
    e.preventDefault();
    console.log("thi sis ");
    try {
      const Response = await UserService.accountAccess();
      console.log(Response);
      const id = Response.id;
      if (Response.role === "user") {
        updatedReviewData = {
          ...reviewData,
          userId: id,
        };
        console.log(updatedReviewData);
      }
      else if(Response.role === "ngo"){
         updatedReviewData = {
          ...reviewData,
          ngoId: id,
        };
        console.log(updatedReviewData);
      }else{
        alert("please login first");
      }
      const response = await axios.post("http://localhost:8080/AboutReview",updatedReviewData);
      if(response.status === 200){
        alert("Thank you for your feedback");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-300 py-16 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
          <img
            src={mainlogoImg}
            alt="About Us"
            className="rounded-full object-cover w-2/3 h-full border-2 border-green-800"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-20">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">
            <span className="text-black trade-winds text-7xl">
              <span className="text-yellow-600 text-8xl">1</span>Saath
            </span>
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
      <hr className="border-0 h-[4px] w-full bg-gradient-to-r from-pink-500 to-yellow-500" />

      {/* Values Section */}
      <div className="my-16 text-center">
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
                We foster a collaborative environment where NGOs and donors work together to achieve common goals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-0 h-[4px] w-full bg-gradient-to-r from-pink-500 to-yellow-500" />

      <Reviews />
      <hr className="border-0 h-[4px] w-full bg-gradient-to-r from-pink-500 to-yellow-500" />

      {/* Reviews Section */}
      <div className="my-16 text-center bg-transparent">
        <h3 className="text-4xl font-bold text-blue-800 mb-8">Share Your Experience</h3>
        <div className="bg-white shadow-md rounded-lg max-w-md mx-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-900 font-bold mb-2">
                Your Review
              </label>
              <textarea
                id="content"
                name="content"
                value={reviewData.content}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Write your review here..."
                required
              ></textarea>
            </div>


            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <hr className="border-0 h-[4px] w-full bg-gradient-to-r from-pink-500 to-yellow-500" />

      <div className="bg-blue- py-12 px-8 mt-10">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h3 className="text-4xl font-bold mb-6">Join Us in Making a Difference</h3>
          <p className="text-xl mb-8">
            Whether you’re an NGO, donor, or volunteer, your support helps us create lasting impact. Get involved today!
          </p>
          <button
            onClick={()=>navigate("/list")}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Get Involved
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
