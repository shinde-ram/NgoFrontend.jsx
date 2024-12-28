import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel CSS
import NgoFieldService from '../../Service/NgoFieldService';

function OneNgoField() {
    const { id } = useParams(); // Get the field id from the URL
    const [field, setField] = useState(null);

    const baseImageURL = 'http://localhost:8080/Field/getFieldImage/';

    useEffect(() => {
        const fetchField = async () => {
            try {
                // Fetch the field details by field_id
                const response = await NgoFieldService.getFieldById(id);
                setField(response.data);

            } catch (error) {
                console.error("Error fetching field data or images:", error);
            }
        };
        fetchField();
    }, [id]);

    if (!field) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" mx-auto p-6">
            {/* Carousel Section */}
            <div className="w-full  lg:w-1/2 mx-auto mb-8 " >
                <Carousel
                    showThumbs={false}
                    autoPlay
                    infiniteLoop
                    className="rounded-lg shadow-lg"
                >
                    <div key={field.field_id}>
                        <img src={`${baseImageURL}${field.field_id}`} alt={`${field.field_id}`} className="rounded-lg object-cover h-80" />
                    </div>
                </Carousel>
            </div>

            {/* Field Information Section */}
            <div className="bg-gray-300 shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-4">{field.field_name}</h2>
                <p className="text-lg mb-6">{field.field_content}</p>

            </div>
        </div>
    );
}

export default OneNgoField;
