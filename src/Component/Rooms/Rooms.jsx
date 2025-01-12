import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(res => res.json())
      .then(data => {
        // Slice the first 20 rooms and set them in state
        setRooms(data.slice(0, 20));
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {rooms.map((room, idx) => (
        <RoomCard key={idx} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
