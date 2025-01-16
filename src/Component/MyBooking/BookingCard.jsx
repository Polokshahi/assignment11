import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2

const BookingCard = ({ booking }) => {
     useEffect(() => {
          document.title = "My Bookings";
        },[]);
  const {
    _id,
    roomId,
    image,
    bedType,
    type,
    roomNumber,
    price,
    startDate,
    endDate,
    bookedBy,
  } = booking;

  // The state for the new end date, initialized with the current endDate
  const [newEndDate, setNewEndDate] = useState(endDate);

  // Handler for updating the end date
  const handleDateChange = (e) => {
    setNewEndDate(e.target.value); // Update state with the new date value
  };

  // Function to handle updating the booking date in the backend
  const updateBookingDate = async () => {
    try {
      // Make a PATCH request to the backend to update the end date
      const response = await fetch(`http://localhost:3000/bookings/update/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endDate: newEndDate }), // Send the new end date
      });

      // Check if the request was successful
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Booking date updated successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update booking date.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.error('Error updating booking date:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error updating booking date.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  // Function to handle deleting the booking with SweetAlert2
    // Function to handle deleting the booking with a confirmation modal
const handleDelete = async () => {
  try {
    // Show a confirmation modal with Yes and No options
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      // Call the delete API endpoint to cancel the booking
      const response = await fetch(`http://localhost:3000/bookings/cancel/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Swal.fire({
          title: 'Booking Canceled!',
          text: 'Your booking has been successfully canceled.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to cancel booking.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } else {
      Swal.fire({
        title: 'Canceled',
        text: 'Your booking is safe.',
        icon: 'info',
        confirmButtonText: 'Okay',
      });
    }
  } catch (error) {
    console.error('Error canceling booking:', error);
    Swal.fire({
      title: 'Error',
      text: 'Error canceling booking.',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }
};


  return (
    <div className="card w-full bg-base-100 shadow-xl p-4 border-2">
      <figure>
        <img
          src={image}
          alt={`Room ${roomNumber}`}
          className="rounded-lg w-[500px] h-[200px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">Room {roomNumber}</h2>
        <p>
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p>
          <span className="font-semibold">Bed Type:</span> {bedType}
        </p>
        <p>
          <span className="font-semibold">Price per Night:</span> ${price}
        </p>
        <p>
          <span className="font-semibold">Start Date:</span> {startDate}
        </p>
        <p>
          <span className="font-semibold">End Date:</span> {endDate}
        </p>
        <p>
          <span className="font-semibold">Booked By:</span> {bookedBy}
        </p>

        {/* Date Picker and Update Button */}
        <div className="mt-4">
          <input
            type="date"
            value={newEndDate}
            onChange={handleDateChange} // Update the date when user selects a new date
            className="input input-bordered w-full max-w-xs"
          />
    

        <div className='flex gap-3 items-center mt-3'>
        <button
            onClick={updateBookingDate} // Call updateBookingDate function on click
            className="btn btn-primary mt-2"
          >
            Update Date
          </button>

          <button
            onClick={handleDelete} // Call handleDelete function on click
            className="btn btn-secondary mt-2"
          >
            Cancel Booking
          </button>
       
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
