import React, { useEffect } from 'react';
import Slider from './Slider';
import Heading from './Heading';
import FirstComponent from '../Component/My_Component/FirstComponent';
import SecondComponent from '../Component/My_Component/SecondComponent';

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen">
            {/* Slider Section */}
            <section className="bg-white shadow-md rounded-lg p-4 mb-4">
                <Slider />
            </section>

            {/* Heading Section */}
            <section className="bg-purple-100 text-purple-900 shadow-md rounded-lg p-4 mt-2 mb-3">
                <Heading />
            </section>

            {/* First Component Section */}
            <section className="bg-blue-100 text-blue-900 shadow-md rounded-lg p-4 mt-2 mb-3">
                <FirstComponent />
            </section>

            {/* Second Component Section */}
            <section className="bg-pink-100 text-pink-900 shadow-md rounded-lg p-4 mt-2 mb-5">
                <SecondComponent />
            </section>
         
        </div>
    );
};

export default Home;
