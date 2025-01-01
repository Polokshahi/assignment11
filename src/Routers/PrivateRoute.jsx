import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../Page/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext); 
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }


    if(user && user?.email){
        return children;
    }
    else{
        return <Navigate state={location} to={'/login'}></Navigate>
    }
};

export default PrivateRoute;