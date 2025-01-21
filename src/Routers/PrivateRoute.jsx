import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/Provider';
import Loading from '../Page/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
       // If the user data is still loading, show a loading screen
       if (loading) {
        return <Loading />;
    }
    // If the user is logged in, render the child components
    if (user) {
        return children;
    }
   else{
      // Otherwise, redirect to the login page
      return <Navigate to="/login"/>;
   }
};

export default PrivateRoute;
