import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Page/Shared/NavBar';
import Footer from '../Page/Shared/Footer';

const MainLayout = () => {
    return (
        <div className='max-xl mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;