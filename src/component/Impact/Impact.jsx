import React from "react";
import { FaTree, FaUserFriends, FaHandsHelping, FaHeartbeat } from "react-icons/fa";
import education from "../../images/education.webp";
import health from "../../images/healthcare.webp";
import women from "../../images/womenimpowerment.webp";
import CountNgo from "../Home/CountNgo";


const Impact = () => {
  const stats = [
    { icon: <FaTree />, label: "Trees Planted", value: "50,000+" },
    { icon: <FaUserFriends />, label: "Student Support", value: "10,000+" },
    { icon: <FaHandsHelping />, label: "Volunteer Hours", value: "15,000+" },
    { icon: <FaHeartbeat />, label: "Healthcare Beneficiaries", value: "5,000+" },
  ];

  const successStories = [
    {
      image: education,
      title: "Education for All",
      description:
        "We provided free education to over 2,000 children in rural areas, helping them secure a brighter future.",
    },
    {
      image: health,
      title: "Healthcare Access",
      description:
        "Our medical camps reached remote areas, offering free healthcare to 3,500+ individuals.",
    },
    {
      image: women,
      title: "Women Empowerment",
      description:
        "We trained 500 women in vocational skills, enabling them to become self-reliant.",
      },
  ];

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="w-full bg-blue-300 text-black py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 trade-winds">Our Impact</h1>
        <p className="text-lg">
          Together, we’re making a difference in countless lives and creating a sustainable future.
        </p>
      </div>

      <div>
            <CountNgo/>
      </div>
      {/* Statistics Section */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="text-blue-800 text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-bold mt-4">{story.title}</h3>
                <p className="text-gray-600 mt-2">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      
    </div>
  );
};

export default Impact;
