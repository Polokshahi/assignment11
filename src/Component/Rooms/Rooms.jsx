import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';



const Rooms = () => {

    const [rooms, setRooms] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/rooms')
        .then(res => res.json())
        .then(data => setRooms(data))
    },[])

    

  

    



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

            {
               rooms?.map((room, idx) => <RoomCard key={idx} room={room}></RoomCard>)
            }
            
        </div>
    );
};

export default Rooms;