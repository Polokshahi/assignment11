import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'; // For confirmation dialogs and notifications
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications

const MyBooking = () => {
  const bookData = useLoaderData();
  const bookedRooms = bookData?.bookedRooms || [];
  const [rooms, setRooms] = useState(bookedRooms); // Use state to manage updated rooms

  // Cancel booking handler
  const handleCancelBooking = (roomId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('http://localhost:3000/cancel-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId }),
          });
  
          const data = await response.json();
          if (data.success) {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
  
            // Update the state to reflect the cancellation by removing the cancelled room
            const updatedRooms = rooms.filter((room) => room.roomId !== roomId);
            setRooms(updatedRooms); // Update the UI with the remaining rooms
          } else {
            Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while canceling the booking.', 'error');
        }
      }
    });
  };

  // Review handler
  const handlePostReview = (roomId) => {
    Swal.fire({
      title: 'Post a Review',
      input: 'textarea',
      inputPlaceholder: 'Write your review here...',
      showCancelButton: true,
      confirmButtonText: 'Post Review',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reviewText = result.value;

        try {
          const response = await fetch('http://localhost:3000/post-review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId, review: reviewText }),
          });

          const data = await response.json();
          if (data.success) {
            Swal.fire('Success!', 'Your review has been posted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to post the review.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while posting the review.', 'error');
        }
      }
    });
  };

  // Update date handler
  const handleUpdateDate = (roomId) => {
    Swal.fire({
      title: 'Select New Booking Date',
      input: 'date',
      inputAttributes: {
        min: new Date().toISOString().split('T')[0], // Disable past dates
      },
      showCancelButton: true,
      confirmButtonText: 'Update Date',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const newDate = result.value;

        try {
          const response = await fetch('http://localhost:3000/update-booking-date', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId, newDate }),
          });

          const data = await response.json();
          if (data.success) {
            // Update room in the state with the new date
            const updatedRooms = rooms.map((room) =>
              room.roomId === roomId ? { ...room, bookedDate: newDate } : room
            );
            setRooms(updatedRooms); // Update the UI

            // Notify user of successful update using toast
            toast.success('Booking date updated successfully!');
          } else {
            Swal.fire('Error!', 'Failed to update the booking date.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while updating the booking date.', 'error');
        }
      }
    });
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomId} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img src={room.image} alt={room.roomNumber} className="object-cover h-48 w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{room.roomNumber}</h2>
                <p>{room.description}</p>
                <p><strong>Price:</strong> ${room.price}</p>
                <p><strong>Booked on:</strong> {room.bookedDate}</p>

                <div className="flex flex-wrap justify-between mt-4 space-y-2 sm:space-y-0">
                  <button
                    onClick={() => handleCancelBooking(room.roomId)}
                    className="btn btn-danger w-full sm:w-auto"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => handleUpdateDate(room.roomId)}
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    Update Date
                  </button>
                  <button
                    onClick={() => handlePostReview(room.roomId)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Post Review
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-lg">No bookings found.</div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default MyBooking;
