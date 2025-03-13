import { useState, useEffect } from "react";
import GalleryNgoService from "../../Service/GalleryNgoService";

const NgoImageSlider = ({ ngoId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const ngo = { id: ngoId };
        // Fetch images from backend
        const response = await GalleryNgoService.getImages(ngo);

        if (response.data.length > 0) {
          setImages(response.data); // Set images directly
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // ✅ Call the async function
  }, [ngoId]);

  if (images.length === 0) {
    return <p className="text-center text-gray-500">No images available</p>;
  }

  return (
    <div className="overflow-hidden relative w-full mt-20">
      <div
        className="flex whitespace-nowrap w-[100%]"
        style={{
          animation: `scroll ${images.length * (images.length < 3 ? 8 : 3)}s linear infinite`,
        }}
      >
{        console.log(images)
}        {/* Display images once */}
        {images.map((image, index) => (
          <img
          key={index}
          src={`http://localhost:8080${image.imagePath}`}
          alt={image.imageName}
          className="w-40 h-40 mx-2 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tailwind CSS Animation */}
      <style>
        {`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          display: flex;
        }
      `}
      </style>
    </div>
  );
};

export default NgoImageSlider;
