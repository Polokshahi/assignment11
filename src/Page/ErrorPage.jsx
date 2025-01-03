import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="mb-6">
                    {/* Image or illustration */}
                    <img 
                        src="https://www.example.com/404-illustration.svg" 
                        alt="404 Error" 
                        className="w-40 mx-auto mb-4"
                    />
                </div>
                <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
                <p className="text-lg text-gray-700 mb-4">It looks like you've hit a dead end. This page is not available.</p>
                <p className="text-gray-500 mb-6">Don’t worry, we’ll get you back on track.</p>
                <Link 
                    to={'/'}
                    className="inline-block px-6 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
