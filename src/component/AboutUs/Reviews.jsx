import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import UserService from "../../Service/UserService";
import NgoService from "../../Service/NgoService";

function Reviews() {
  const [reviews, setReviews] = useState([]); // State to store fetched reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch the reviews from the backend
        const response = await axios.get("http://localhost:8080/AboutReview");

        // Fetch additional user data (e.g., user name and profile image) for each review
        const reviewsWithUserDetails = await Promise.all(
          response.data.map(async (review) => {
            if (review.userId) {
              const user = await UserService.getUserById(review.userId);
              return {
                descr: review.content, // Review content
                Name: user.data.name, // User's name
                Image: `http://localhost:8080/Profile/getprofileimage/${review.userId}`
              };
            } else if (review.ngoId) {
              const ngo = await NgoService.getNgoById(review.ngoId);
              return {
                descr: review.content, // Review content
                Name: ngo.data.name, // User's name
                Image: `http://localhost:8080/getprofileimage/${review.ngoId}`
              };
            }
            return review; // In case userId is not present, return the review as is
          })
        );

        setReviews(reviewsWithUserDetails); // Update state with fetched reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="xl:mt-6 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800">
          What Donors Are Saying
        </h2>
        <Carousel
          infiniteLoop={true}
          showStatus={false}
          autoPlay={true}
          interval={3000}
          stopOnHover={false}
          transitionTime={1000}
          showIndicators={false}
          showThumbs={false}
        >
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row justify-center items-center px-4 md:px-20 lg:px-32"
            >
              <div className="flex justify-center items-center mb-6 md:mb-0 md:mr-16 w-[40%]">
                <img
                  src={`${rev.Image}`}
                  alt={rev.Name}
                  className="h-[80px] w-[80px] md:h-[150px] md:w-[150px] lg:h-[150px] lg:max-w-[150px] rounded-full object-contain "
                />
              </div>


              {/* Text Section */}
              <div className="flex flex-col items-center text-center w-full">
                <p className="text-gray-700 text-lg md:text-xl italic mb-4 line-clamp-3 md:line-clamp-6">
                  {rev.descr}
                </p>
                <p className="text-gray-900 font-bold text-base md:text-lg ">
                  — {rev.Name}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
