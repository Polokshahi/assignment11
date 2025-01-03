import React from 'react';

const RoomCard = ({ room }) => {
  const { roomId, roomNumber, type, price, availability, description, bedType, image } = room;

  return (
  
     <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={`Room ${roomNumber}`} className="w-full h-64 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Room {roomNumber}</h2>
        <p className="text-sm text-gray-500">{type} Room</p>
        <p>{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-blue-500">${price} / night</p>
          <span className={`badge ${availability ? 'badge-success' : 'badge-error'}`}>
            {availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <p className="text-sm text-gray-500">Bed Type: {bedType}</p>
       
      </div>
    </div>

  );
};

export default RoomCard;
