import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';

const MyBooking = () => {
    // const location = useLocation();
    // const bookingData = location.state;
    const bookingData = useLoaderData();


    



    if (!bookingData) {
        return <div>No booking data available</div>;
    }

    const { roomNumber, type, price, description, bedType, selectedDate } = bookingData;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Booking Confirmation</h2>
                    <p><strong>Room Number:</strong> {roomNumber}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Price:</strong> ${price} / night</p>
                    <p><strong>Bed Type:</strong> {bedType}</p>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p>{description}</p>
                </div>
                <div className='flex justify-end p-4'>
                    <button className='btn bg-slate-500 text-white'>Cancel</button>
                    <button className='btn bg-purple-600 text-white' >Updata Date</button>
                </div>
            </div>
        </div>
    );
};

export default MyBooking;
