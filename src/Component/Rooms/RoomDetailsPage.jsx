import React, { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
    const { roomId } = useParams();
    const roomData = useLoaderData();
    const navigate = useNavigate();

    const singleRoomData = roomData?.find((room) => room.roomId == roomId);

    if (!singleRoomData) {
        return <div>Room not found</div>;
    }

    const { roomNumber, type, price, description, bedType, image } = singleRoomData;

    const [availability, setAvailability] = useState(singleRoomData.availability);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleBooking = async () => {
        if (!selectedDate) {
            alert("Please select a booking date before confirming.");
            return;
        }

        setIsLoading(true);

        try {
            const formattedDate = new Date(selectedDate).toISOString();

            console.log('Booking Date:', formattedDate); // Debugging
            console.log('Request Body:', { roomId, selectedDate: formattedDate }); // Debugging

            const response = await fetch('http://localhost:3000/book-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId,
                    selectedDate: formattedDate,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setAvailability(false);
                closeModal();
                alert(result.message || "Booking confirmed!");
            } else {
                alert(result.message || "Failed to book the room. Please try again.");
            }
        } catch (error) {
            console.error("Error booking the room:", error);
            alert("An error occurred while booking the room. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

   

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={image || "https://via.placeholder.com/400x300"}
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
                        <span className={`badge ${availability ? "badge-success" : "badge-error"}`}>
                            {availability ? "Available" : "Unavailable"}
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
                            <p>
                                <strong>Room Number:</strong> {roomNumber}
                            </p>
                            <p>
                                <strong>Type:</strong> {type}
                            </p>
                            <p>
                                <strong>Price:</strong> ${price} / night
                            </p>
                            <p>
                                <strong>Description:</strong> {description}
                            </p>
                            <p>
                                <strong>Bed Type:</strong> {bedType}
                            </p>
                        </div>
                        <figure className="mb-4">
                            <img
                                src={image || "https://via.placeholder.com/400x300"}
                                alt={`Room ${roomNumber}`}
                                className="w-full h-40 object-cover rounded-md"
                            />
                        </figure>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={new Date()}
                            className="input input-bordered w-full mt-2"
                            placeholderText="Select Booking Date"
                            dateFormat="yyyy/MM/dd"
                        />
                        <div className="flex justify-between mt-6">
                            <button onClick={closeModal} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Confirm Booking"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetailsPage;
