import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingCard from './BookingCard';

const MyBookings = () => {
     useEffect(() => {
        document.title = "My Bookings";
      },[]);
    const bookingData = useLoaderData();


    console.log(bookingData);


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

            {
                bookingData?.map((booking, idx) => <BookingCard booking={booking} key={idx}></BookingCard>) 
            }
          
        </div>
    );
};

export default MyBookings;
