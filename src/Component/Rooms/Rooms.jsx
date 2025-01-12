import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';



const Rooms = () => {

    const [rooms, setRooms] = useState();

    useEffect(() => {
        fetch('../../../public/Hotel.json')
        .then(res => res.json())
        .then(data => {
            setRooms(data)
            // forBackend(data);
        })


        







    },[])



    // const forBackend = async (roomData) => {
    //     try {
    //         const rooms = await fetch('http://localhost:3000/rooms', { // Replace with your backend URL
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(roomData), // Send the JSON data to the backend
    //         });
    //         if (rooms.ok) {
    //             const result = await rooms.json();
    //             console.log('Rooms uploaded successfully:', result);
    //         } else {
    //             console.error('Failed to upload rooms:', rooms.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading rooms:', error);
    //     }

    // }

    

  

    



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>

            {
               rooms?.map((room, idx) => <RoomCard key={idx} room={room}></RoomCard>)
            }
            
        </div>
    );
};

export default Rooms;