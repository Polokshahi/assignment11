import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/Provider';

const Login = () => {
    const { signIn, setUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle email-password login
    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then((result) => {
                setUser(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${result.user.displayName || 'User'}!`,
                });
                navigate('/');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    };

    // Handle Google login
    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                setUser(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful!',
                    text: `Welcome, ${result.user.displayName || 'User'}!`,
                });
                navigate('/');
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: 'Please try again.',
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-2xl rounded-lg ">
                <h2 className="text-3xl font-semibold text-center text-gray-700">
                    Login
                </h2>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                {/* Google Login */}
                <div className="text-center my-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Google Login
                    </button>
                </div>

                {/* Redirect Link to Register Page */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
