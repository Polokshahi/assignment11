import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Create an Account</h2>

                {/* Registration Form */}
                <form className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}

                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"


                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-600">Photo URL</label>
                        <input
                            type="url"
                            id="photoURL"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your photo URL (optional)"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Error Message */}
                    {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>

                {/* Redirect Link to Login Page */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;