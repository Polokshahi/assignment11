import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const RoomDetailsPage = () => {
    const { roomId } = useParams();
    const roomData = useLoaderData();
    
    // Find the specific room based on the roomId from the URL
    const singleRoomData = roomData.find(room => room.roomId == roomId);

    // Check if the room data exists
    if (!singleRoomData) {
        return <div>Room not found</div>;
    }

    const { roomNumber, type, price, availability, description, bedType, image } = singleRoomData;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Room Details Card */}
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={image || 'https://via.placeholder.com/400x300'} // Default placeholder image if none provided
                        alt={`Room ${roomNumber}`}
                        className="w-full h-64 object-cover"
                    />
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
        </div>
    );
};

export default RoomDetailsPage;
