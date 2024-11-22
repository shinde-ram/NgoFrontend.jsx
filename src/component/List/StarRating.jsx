import React, { useState } from "react";
import NgoService from "../../Service/NgoService";

const StarRating = ({ ngo_Id }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating before submitting!");
            return;
        }

        try {
            const response = await NgoService.submitRating(ngo_Id, rating);

            if (response) {
                alert("Thank you for your feedback!");
                setRating(0);
            }
        } catch (error) {
            // Handle the "already rated" error
            if (error.response && error.response.data) {
                alert(error.response.data.message || "You Already Submitted the Rating");
            } else {
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center lg:justify-start p-4 rounded-lg gap-4">
            <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`text-4xl ${
                            (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
                        }`}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </button>
                ))}
            </div>
            <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Submit Rating
            </button>
        </div>
    );
};

export default StarRating;
