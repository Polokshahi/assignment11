import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/Provider';

const Login = () => {

    const {signIn, setUser, user} = useContext(AuthContext);
    const navigate = useNavigate();

  


    const handleLogin = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        signIn(email, password)
        .then(result => {
            setUser(result)
            navigate('/')
            console.log('login successful', result.user);
            
        }
          
        
        
        )
        .catch(error => {
            console.log(error)
        })
        




    }










    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name='password'
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
            Login
          </button>
        </form>

        {/* Google Login */}
        <div className="text-center my-4">
        {/* google login */}

        <button
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Google Login
          </button>
        </div>

        {/* Redirect Link to Register Page */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Login;