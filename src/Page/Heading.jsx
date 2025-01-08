import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Heading = () => {
    const navigate = useNavigate(); // Hook for navigation
   

    const handleRedirect = () => {
        navigate('/rooms'); // Redirects to the Rooms page
            };
    return (
        <div className="relative bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-xl">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold leading-tight mb-4">
                Discover Our Beautiful Rooms
            </h2>
            <p className="text-lg mb-6">
                Whether you're here for a short stay or an extended visit, we offer a variety of comfortable rooms with all the amenities you need.
            </p>
            <button
                onClick={handleRedirect}
                className="px-8 py-3 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
            >
                View Rooms
            </button>
        </div>
    </div>
    );
};

export default Heading;