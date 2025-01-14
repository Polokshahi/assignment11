import React from 'react';

const BookingCard = ({ booking }) => {
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

  return (
    <div className="card w-full bg-base-100 shadow-xl p-4 border-2">
      <figure>
        <img src={image} alt={`Room ${roomNumber}`} className="rounded-lg w-[500px] h-[200px]" />
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
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Update Date</button>
          <button className="btn btn-secondary">Cancel Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
