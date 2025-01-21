import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

const BookingCard = ({ booking, onCancel, onUpdateDate }) => {
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

  // Ensure the endDate is a valid date. If not, set it to the current date.
  const [selectedDate, setSelectedDate] = useState(() => {
    const validEndDate = new Date(endDate);
    return isNaN(validEndDate.getTime()) ? new Date() : validEndDate; // Fallback to current date if invalid
  });

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        onCancel(_id); // Pass the booking ID to cancel it
        Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date in the state
  };

  const handleUpdateDate = () => {
    // Call the onUpdateDate function passed as a prop to update the end date
    onUpdateDate(_id, selectedDate);
    Swal.fire('Updated!', 'Your booking date has been updated.', 'success');
  };

  return (
    <div className="card card-compact bg-base-100 w-full md:w-96 shadow-xl">
      <figure>
        <img
          src={image}
          alt={`Room ${roomNumber}`}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Room Number: {roomNumber}</h2>
        <p><strong>Room Type:</strong> {type}</p>
        <p><strong>Bed Type:</strong> {bedType}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Booked By:</strong> {bookedBy}</p>

        {/* Date Picker Input Field */}
        <div className="flex justify-center mt-4">
          <label className="mr-2">Select New Date:</label>
          <DatePicker
            selected={selectedDate} // Pass the selected date to the DatePicker
            onChange={handleDateChange} // Update the selected date on change
            className="input input-bordered"
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="btn bg-teal-600 text-white" onClick={handleUpdateDate}>Update Date</button>
          <button className="btn bg-red-500 text-white" onClick={handleCancel}>Cancel Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
