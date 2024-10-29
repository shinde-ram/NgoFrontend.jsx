import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import man from "../../images/man1.avif";


const review = [
  {
    Image: "../../images/man1.avif",
    descr: "Supporting NGOs through this platform has been an incredibly rewarding experience. It's easy to find causes that resonate with me.",
    Name: "Shinde ram"
  },
  {
    Image: "../../images/man2.avif",
    descr: "This platform is a great way to connect with NGOs and support their causes. The process is seamless and trustworthy.",
    Name: "Ramesh Kumar"
  },
  {
    Image: "./images/man1.avif",
    descr: "I've discovered so many amazing NGOs through this platform. It's a pleasure to contribute to such worthy causes.",
    Name: "Chaudharii Dinesh"
  }
];

function Reviews() {
  return (
    <div className="bg-blue-100 py-10 ">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">What Donors Are Saying</h2>
        <Carousel
          infiniteLoop={true}
          showStatus={false}
          autoPlay={true}
          interval={5000}
          stopOnHover={false}
          transitionTime={800}
        >
          {review.map((rev, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full h-[60vh]  justify-center items-center px-52"
            >
              <div className="flex justify-center items-center h-auto  px-10">
                <img
                  src={man}
                  alt={rev.Name}
                  className="object-contain h-[50vh] w-[50vh] rounded-full  border-4 border-gray-300"
                />
              </div>

              <div className="w-full md:w-3/2 flex flex-col justify-center items-center md:px-4">
                <p className="text-gray-700 text-center text-xl italic mb-4">
                  {rev.descr}
                </p>
                <p className="text-center text-gray-900 font-bold">— {rev.Name}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
