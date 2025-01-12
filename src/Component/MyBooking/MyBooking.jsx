import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MyBooking = () => {
  const bookData = useLoaderData();
  const bookedRooms = bookData?.bookedRooms || []; // Access booked rooms


  console.log(bookedRooms);

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookedRooms.length > 0 ? (
          bookedRooms.map((room) => (
            <div key={room.roomId} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img src={room.image} alt={room.roomNumber} className="object-cover h-48 w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{room.roomNumber}</h2>
                <p>{room.description}</p>
                <p><strong>Price:</strong> ${room.price}</p>
                <p><strong>Booked on:</strong> {room.bookedDate}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-lg">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
