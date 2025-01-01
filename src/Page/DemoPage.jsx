import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/Provider';

const DemoPage = () => {
    const {name} = useContext(AuthContext);
    return (
        <div>

           
            
        </div>
    );
};

export default DemoPage;