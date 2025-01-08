import React from 'react';
import Slider from './Slider';
import Heading from './Heading';

const Home = () => {
    return (
        <div>

            <section>
                <Slider></Slider>
            </section>

            <section className='mt-2 mb-3 '>
                <Heading></Heading>
            </section>
            
        </div>
    );
};

export default Home;