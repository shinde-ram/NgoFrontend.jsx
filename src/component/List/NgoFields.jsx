import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NgoService from '../../Service/NgoService';


function NgoFields() {
    const [fields, setFields] = useState([]);
    const { id } = useParams(); // Get the NGO id from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await NgoService.getNgoById(id); // Fetch a specific NGO by ID
                setFields(response.data.ngoFields); // Set the fields from the NGO response
            } catch (error) {
                console.error("Error fetching fields:", error);
            }
        };
        fetchFields();
    }, [id]); // The effect runs whenever `id` changes

    const baseImageURL = 'http://localhost:8080/field/getFieldImage/';

    return (
        <div>
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Related Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 text-white ">
                    {fields.length > 0 ? (fields.map((field) => (
                        <div
                            key={field.field_id}
                            className="bg-white  shadow-md rounded-lg p-3 border-2 border-black flex flex-col items-center "
                        >
                            <div className='h-72 pb-4 w-full flex items-center justify-center '>
                                <img
                                    src={`${baseImageURL}${field.field_id}`}
                                    alt={field.field_name}
                                    className="rounded-lg my-4 h-full w-full object-cover"
                                />
                            </div>
                            <hr className="h-1 w-full bg-red-400" />
                            <div className=''>
                                <h4 className="text-3xl font-bold text-black text-center ">{ } {field.field_name}</h4>
                                <p className="text-lg  mt-2 text-start text-black line-clamp-6">{field.field_content}</p>
                                <button 
                                className="text-blue-600 mt-2" 
                                onClick={() =>(navigate(`/list/ngofield/${field.field_id}`))}
                            >
                                About More
                            </button>
                            </div>

                        </div>
                    ))) :
                        (
                            <div className='text-red-500 text-xl font-semibold'>No Related fields added</div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default NgoFields;
