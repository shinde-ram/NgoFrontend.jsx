import React, { useEffect, useState } from 'react';
import defaultImage from "../../images/defaultReview.avif"
const NgoReview = (props) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch comments for the given NGO from the API
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost8080/NgoReview/`);
        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [props.ngo_id]);

  useEffect(() => {
    // Rotate to the next comment every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [comments.length]);

  if (comments.length === 0) return <p>No comments available.</p>;

  return (
    <div className="comment-slider bg-white shadow-md rounded-lg p-4">
      <div className="comment-card flex flex-col items-center">
        <img
          src={defaultImage/*comments[currentIndex].profile==null?"http://localhost:8080/getprofileimage/"+comments[currentIndex].ngo:"http://localhost:8080/getprofileimage/"+comments[currentIndex].profile*/}
          alt={`${comments[currentIndex].name}'s profile`}
          className="w-12 h-12 rounded-full mb-3"
        />
        <h4 className="font-bold text-gray-800">{comments[currentIndex].name}</h4>
        <p className="text-gray-600 text-center">{comments[currentIndex].content}</p>
      </div>
    </div>
  );
};

export default NgoReview;
