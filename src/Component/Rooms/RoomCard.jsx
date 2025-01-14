// import React from 'react';
// import { Link } from 'react-router-dom';

// const RoomCard = ({ room }) => {
//   const { roomId, roomNumber, type, price, availability, description, bedType, image } = room;
//   // console.log(roomId);

//   return (
//     <Link to={`/rooms/room_details_page/${roomId}`} className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all">
//       <figure>
//         <img src={image} alt={`Room ${roomNumber}`} className="w-full h-64 object-cover" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">Room {roomNumber}</h2>
//         <p className="text-sm text-gray-500">{type} Room</p>
//         <p>{description}</p>
//         <div className="flex justify-between items-center">
//           <p className="font-bold text-lg text-blue-500">${price} / night</p>
//           <span className={`badge ${availability ? 'badge-success' : 'badge-error'}`}>
//             {availability ? 'Available' : 'Unavailable'}
//           </span>
//         </div>
//         <p className="text-sm text-gray-500">Bed Type: {bedType}</p>
//       </div>
//     </Link>
//   );
// };

// export default RoomCard;
