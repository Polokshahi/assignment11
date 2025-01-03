import React, { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker

const RoomDetailsPage = () => {
    const { roomId } = useParams();
    const roomData = useLoaderData();
    const navigate = useNavigate();

    // Find the specific room based on the roomId from the URL
    const singleRoomData = roomData.find(room => room.roomId == roomId);

    // Check if the room data exists
    if (!singleRoomData) {
        return <div>Room not found</div>;
    }

    const { roomNumber, type, price, description, bedType, image } = singleRoomData;

    // Local state to manage the availability of the room
    const [availability, setAvailability] = useState(singleRoomData.availability);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);  // Update state for selected date
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Open the modal
    const openModal = () => setIsModalOpen(true);

    // Close the modal
    const closeModal = () => setIsModalOpen(false);

    // Handle booking confirmation
    const confirmBooking = () => {
        if (selectedDate) {
            setAvailability(false); // Mark the room as unavailable
            setBookingConfirmed(true);
            alert(`Room ${roomNumber} has been booked successfully for ${selectedDate.toLocaleDateString()}!`);
            closeModal();
        } else {
            alert('Please select a date to confirm your booking.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="btn btn-secondary mb-4"
            >
                Go Back
            </button>

            {/* Room Details Card */}
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

                    {/* Book Now Button */}
                    <button
                        onClick={openModal}
                        className="btn btn-primary mt-4"
                        disabled={!availability} // Disable if the room is unavailable
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Room Booking Summary</h2>
                        <p><strong>Room Number:</strong> {roomNumber}</p>
                        <p><strong>Type:</strong> {type}</p>
                        <p><strong>Price:</strong> ${price} / night</p>
                        <p><strong>Bed Type:</strong> {bedType}</p>
                        <p><strong>Description:</strong> {description}</p>
                        <p><strong>Availability:</strong> {availability ? 'Available' : 'Unavailable'}</p>

                        {/* Date Picker */}
                        <div className="mt-4">
                            <label htmlFor="bookingDate" className="block text-sm">Select your booking date</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)} 
                                minDate={new Date()}  // Disable past dates
                                className="input input-bordered w-full mt-2"
                                dateFormat="yyyy/MM/dd" // Optional: format date in a user-friendly way
                            />
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-between mt-6">
                            <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
                            <button
                                onClick={confirmBooking}
                                className="btn btn-primary"
                                disabled={!selectedDate}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Show Booking Confirmation */}
            {bookingConfirmed && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Booking Confirmed</h2>
                        <p>Your booking for Room {roomNumber} has been confirmed for {selectedDate.toLocaleDateString()}!</p>
                        <button onClick={() => setBookingConfirmed(false)} className="btn btn-primary mt-4">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetailsPage;
