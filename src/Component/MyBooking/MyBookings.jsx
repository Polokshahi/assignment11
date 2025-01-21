import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/Provider';
import BookingCard from './BookingCard';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then(res => res.json())
      .then(data => setBookings(data))
  }, [user.email]);

  const handleCancelBooking = (bookingId) => {
    fetch(`http://localhost:3000/bookings/cancel/${bookingId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Booking canceled successfully') {
          setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        }
      })
      .catch(error => {
        console.error('Error canceling booking:', error);
      });
  };

  const handleUpdateDate = (bookingId, newEndDate) => {
    fetch(`http://localhost:3000/bookings/update-end-date/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endDate: newEndDate.toISOString(), // Send the updated date
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Booking updated successfully') {
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking._id === bookingId ? { ...booking, endDate: newEndDate.toISOString() } : booking
            )
          );
        }
      })
      .catch(error => {
        console.error('Error updating booking date:', error);
      });
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {  // Check if the date is invalid
      return '';  // Return an empty string if the date is invalid
    }
    return parsedDate.toLocaleDateString('en-GB'); // Format as dd/MM/yyyy
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4'>
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={{
            ...booking,
            startDate: formatDate(booking.startDate),
            endDate: formatDate(booking.endDate), // Format both startDate and endDate
          }}
          onCancel={handleCancelBooking}
          onUpdateDate={handleUpdateDate}
        />
      ))}
    </div>
  );
};

export default MyBookings;
