import React, { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MyBooking from '../MyBooking/MyBooking';

const RoomDetailsPage = () => {
    const { roomId } = useParams();
    const roomData = useLoaderData();
    const navigate = useNavigate();

    const singleRoomData = roomData.find(room => room.roomId == roomId);

    if (!singleRoomData) {
        return <div>Room not found</div>;
    }

    const { roomNumber, type, price, description, bedType, image } = singleRoomData;

    const [availability, setAvailability] = useState(singleRoomData.availability);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [booking, setBooking] = useState(singleRoomData);
    console.log(booking)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const confirmBooking = async () => {
        if (selectedDate) {
            setAvailability(false);
            const bookingData = {
                roomId,
                roomNumber,
                type,
                price,
                description,
                bedType,
                image,
                selectedDate: selectedDate.toLocaleDateString(),
            };
            console.log('Booking Data:', bookingData);

            try {
                // Send booking data to the backend
                const response = await fetch('http://localhost:3000/myBooking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),
                });

                if (response.ok) {
                    alert(`Room ${roomNumber} has been booked successfully!`);
                    closeModal();

                    // Navigate to MyBooking with booking data
                    // navigate('/myBookings', { state: bookingData });
                } else {
                    alert('Failed to book the room. Please try again.');
                }
            } catch (error) {
                console.error('Error booking room:', error);
                alert('An error occurred while booking the room. Please try again.');
            }
        } else {
            alert('Please select a date to confirm your booking.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={image || 'https://via.placeholder.com/400x300'}
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

                    <button
                        onClick={openModal}
                        className="btn btn-primary mt-4"
                        disabled={!availability}
                    >
                        Book Now
                    </button>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">
                        Go Back
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Room Booking Summary</h2>
                        <div className="mb-4">
                            <p><strong>Room Number:</strong> {roomNumber}</p>
                            <p><strong>Type:</strong> {type}</p>
                            <p><strong>Price:</strong> ${price} / night</p>
                            <p><strong>Description:</strong> {description}</p>
                            <p><strong>Bed Type:</strong> {bedType}</p>
                        </div>
                        <figure className="mb-4">
                            <img
                                src={image || 'https://via.placeholder.com/400x300'}
                                alt={`Room ${roomNumber}`}
                                className="w-full h-40 object-cover rounded-md"
                            />
                        </figure>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            className="input input-bordered w-full mt-2"
                            dateFormat="yyyy/MM/dd"
                        />
                        <div className="flex justify-between mt-6">
                            <button onClick={closeModal} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button onClick={confirmBooking} className="btn btn-primary">
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default RoomDetailsPage;








// myyyyyyyyyyybooking

import React from 'react';
import { useLoaderData  } from 'react-router-dom';

const MyBooking = () => {
    // const location = useLocation();
    // const bookingData = location.state;
    const bookingData = useLoaderData();
 


    



    if (!bookingData) {
        return <div>No booking data available</div>;
    }

    const { roomNumber, type, price, description, bedType, selectedDate } = bookingData;

    return (

       



        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Booking Confirmation</h2>
                    <p><strong>Room Number:</strong> {roomNumber}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Price:</strong> ${price} / night</p>
                    <p><strong>Bed Type:</strong> {bedType}</p>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p>{description}</p>
                </div>
                <div className='flex justify-end p-4'>
                    <button className='btn bg-slate-500 text-white'>Cancel</button>
                    <button className='btn bg-purple-600 text-white' >Updata Date</button>
                </div>
            </div>
        </div>
    );
};

export default MyBooking;

