import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Page/Shared/NavBar';
import Footer from '../Page/Shared/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
            {/* NavBar - header at the top */}
            <NavBar />

            {/* Main Content - takes up the remaining space */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer - at the bottom */}
            <Footer />
        </div>
    );
};

export default MainLayout;
