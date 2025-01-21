import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/Provider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Firebase.init';

const Register = () => {
    const { register, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        console.log(name, email, photoURL, password);

        register(email, password)
            .then(result => {
                console.log(result);
                setUser(result.user); // Set the user once registration is successful

                // Now update the user's profile
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                }).then(() => {
                    navigate('/'); // Navigate to the homepage after updating profile
                }).catch(error => {
                    console.log("Error updating profile:", error);
                });
            })
            .catch(error => {
                console.log("Error registering:", error);

            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Create an Account</h2>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name='name'
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
                            name='email'
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
                            name='photoURL'
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
                            name='password'
                        />
                    </div>

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
