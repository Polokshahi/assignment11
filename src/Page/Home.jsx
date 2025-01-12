import React from 'react';
import Slider from './Slider';
import Heading from './Heading';
import FirstComponent from '../Component/My_Component/FirstComponent';
import SecondComponent from '../Component/My_Component/SecondComponent';

const Home = () => {
    return (
        <div>

            <section>
                <Slider></Slider>
            </section>

            <section className='mt-2 mb-3 '>
                <Heading></Heading>
            </section>

            <section className='mt-2 mb-3 '>
                <FirstComponent></FirstComponent>
            </section>


            <section className='mt-2 mb-5 '>
                <SecondComponent></SecondComponent>
            </section>
            
        </div>
    );
};

export default Home;