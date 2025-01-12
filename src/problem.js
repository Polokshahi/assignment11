import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'; // For confirmation dialogs and notifications
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications

const MyBooking = () => {
  const bookData = useLoaderData();
  const bookedRooms = bookData?.bookedRooms || [];
  const [rooms, setRooms] = useState(bookedRooms); // Use state to manage updated rooms

  // Cancel booking handler
  const handleCancelBooking = (roomId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('http://localhost:3000/cancel-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId }),
          });
  
          const data = await response.json();
          if (data.success) {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
  
            // Update the state to reflect the cancellation by removing the cancelled room
            const updatedRooms = rooms.filter((room) => room.roomId !== roomId);
            setRooms(updatedRooms); // Update the UI with the remaining rooms
          } else {
            Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while canceling the booking.', 'error');
        }
      }
    });
  };

  // Review handler
  const handlePostReview = (roomId) => {
    Swal.fire({
      title: 'Post a Review',
      input: 'textarea',
      inputPlaceholder: 'Write your review here...',
      showCancelButton: true,
      confirmButtonText: 'Post Review',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reviewText = result.value;

        try {
          const response = await fetch('http://localhost:3000/post-review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId, review: reviewText }),
          });

          const data = await response.json();
          if (data.success) {
            Swal.fire('Success!', 'Your review has been posted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to post the review.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while posting the review.', 'error');
        }
      }
    });
  };

  // Update date handler
  const handleUpdateDate = (roomId) => {
    Swal.fire({
      title: 'Select New Booking Date',
      input: 'date',
      inputAttributes: {
        min: new Date().toISOString().split('T')[0], // Disable past dates
      },
      showCancelButton: true,
      confirmButtonText: 'Update Date',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const newDate = result.value;

        try {
          const response = await fetch('http://localhost:3000/update-booking-date', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId, newDate }),
          });

          const data = await response.json();
          if (data.success) {
            // Update room in the state with the new date
            const updatedRooms = rooms.map((room) =>
              room.roomId === roomId ? { ...room, bookedDate: newDate } : room
            );
            setRooms(updatedRooms); // Update the UI

            // Notify user of successful update using toast
            toast.success('Booking date updated successfully!');
          } else {
            Swal.fire('Error!', 'Failed to update the booking date.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'An error occurred while updating the booking date.', 'error');
        }
      }
    });
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomId} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img src={room.image} alt={room.roomNumber} className="object-cover h-48 w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{room.roomNumber}</h2>
                <p>{room.description}</p>
                <p><strong>Price:</strong> ${room.price}</p>
                <p><strong>Booked on:</strong> {room.bookedDate}</p>

                <div className="flex flex-wrap justify-between mt-4 space-y-2 sm:space-y-0">
                  <button
                    onClick={() => handleCancelBooking(room.roomId)}
                    className="btn btn-danger w-full sm:w-auto"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => handleUpdateDate(room.roomId)}
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    Update Date
                  </button>
                  <button
                    onClick={() => handlePostReview(room.roomId)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Post Review
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-lg">No bookings found.</div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default MyBooking;






const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Room data to insert
const rooms = [
  {
    "roomId": 1,
    "roomNumber": "101",
    "type": "Single",
    "price": 50,
    "availability": true,
    "description": "A cozy single room with all basic amenities.",
    "bedType": "Single Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UlVfbXpFKiYPHYsNn0E1op-q1S3yva15Hg&s"
  },
  {
    "roomId": 2,
    "roomNumber": "102",
    "type": "Double",
    "price": 75,
    "availability": true,
    "description": "A comfortable double room ideal for couples.",
    "bedType": "Double Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqPs-hLRxPBwbFnowBIW9alxctSnl96aATg&s"
  },
  {
    "roomId": 3,
    "roomNumber": "103",
    "type": "Deluxe",
    "price": 120,
    "availability": false,
    "description": "A luxurious deluxe room with a beautiful view.",
    "bedType": "King Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGEt8kx1WiYYmjg57P1DF7uqDIxFSNfcCJUg&s"
  },
  {
    "roomId": 4,
    "roomNumber": "104",
    "type": "Suite",
    "price": 200,
    "availability": true,
    "description": "An extravagant suite with premium services.",
    "bedType": "King Bed",
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D"
  },
  {
    "roomId": 5,
    "roomNumber": "105",
    "type": "Single",
    "price": 50,
    "availability": true,
    "description": "A cozy single room with modern facilities.",
    "bedType": "Single Bed",
    "image": "https://hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg"
  },
  {
    "roomId": 6,
    "roomNumber": "106",
    "type": "Double",
    "price": 80,
    "availability": false,
    "description": "A spacious double room with a comfortable ambiance.",
    "bedType": "Double Bed",
    "image": "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?semt=ais_hybrid"
  },
  {
    "roomId": 7,
    "roomNumber": "107",
    "type": "Deluxe",
    "price": 130,
    "availability": true,
    "description": "A deluxe room with a stunning city view.",
    "bedType": "Queen Bed",
    "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o="
  },
  {
    "roomId": 8,
    "roomNumber": "108",
    "type": "Suite",
    "price": 250,
    "availability": true,
    "description": "A lavish suite with exclusive features.",
    "bedType": "King Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s"
  },
  {
    "roomId": 9,
    "roomNumber": "109",
    "type": "Single",
    "price": 60,
    "availability": true,
    "description": "A stylish single room with premium amenities.",
    "bedType": "Single Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4e0w7tdeUyst62I8IVtiRs4dArXOkVrUug&s"
  },
  {
    "roomId": 10,
    "roomNumber": "110",
    "type": "Double",
    "price": 85,
    "availability": true,
    "description": "A modern double room with elegant decor.",
    "bedType": "Double Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZWUeJ1dhr7yfnk26HixyCNQ2_DHobQn0NQ-WYVhmlccyB8FF-CsfgrTmSmN0nEoflFLU&usqp=CAU"
  },
  {
    "roomId": 11,
    "roomNumber": "111",
    "type": "Single",
    "price": 55,
    "availability": false,
    "description": "A compact single room with basic facilities.",
    "bedType": "Single Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8iszGt4X07ZlUjU4huIBR8pun_5WH6hAH4w&s"
  },
  {
    "roomId": 12,
    "roomNumber": "112",
    "type": "Deluxe",
    "price": 150,
    "availability": true,
    "description": "A deluxe room with a serene garden view.",
    "bedType": "Queen Bed",
    "image": "https://www.investopedia.com/thmb/LSgfuel7jNEHUE2b2NPXPolnHgM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/LoewsNewOrleans-56a3f6463df78cf7728018e5.jpg"
  },
  {
    "roomId": 13,
    "roomNumber": "113",
    "type": "Suite",
    "price": 300,
    "availability": false,
    "description": "An exclusive suite offering ultimate luxury.",
    "bedType": "King Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zUtFpwsa9xtdfNBO25J83NrVaWnPpeUjPA&s"
  },
  {
    "roomId": 14,
    "roomNumber": "114",
    "type": "Single",
    "price": 65,
    "availability": true,
    "description": "A premium single room with city views.",
    "bedType": "Single Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJd-6HUuWyYoC2wbZkwpmZt822c7EjLW8-Q&s"
  },
  {
    "roomId": 15,
    "roomNumber": "115",
    "type": "Double",
    "price": 95,
    "availability": false,
    "description": "A well-furnished double room for a relaxing stay.",
    "bedType": "Double Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoTyg19n9reECQv8Y2crW6PphVi5h4Vpq1ww&s"
  },
  {
    "roomId": 16,
    "roomNumber": "116",
    "type": "Deluxe",
    "price": 170,
    "availability": true,
    "description": "A spacious deluxe room with elegant interiors.",
    "bedType": "King Bed",
    "image": "https://www.zinus.com.sg/cdn/shop/articles/5-bedroom-design-ideas-to-transform-it-into-a-luxury-hotel-suite.jpg?v=1669103710"
  },
  {
    "roomId": 17,
    "roomNumber": "117",
    "type": "Suite",
    "price": 350,
    "availability": true,
    "description": "A presidential suite with top-notch amenities.",
    "bedType": "King Bed",
    "image": "https://www.oppeinhome.com/upload/image/product/thumb/20211009/white-wood-grain-villa-minimalist-style-decor1.jpg"
  },
  {
    "roomId": 18,
    "roomNumber": "118",
    "type": "Single",
    "price": 70,
    "availability": true,
    "description": "A chic single room with modern furnishings.",
    "bedType": "Single Bed",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqC3UR_0JTwf_x7d7egB_AFtALLu5NI4wBDTHoz9wXMhzf3eGp-guGmPAEKu6U5RBscJ4&usqp=CAU"
  },
  {
    "roomId": 19,
    "roomNumber": "119",
    "type": "Double",
    "price": 100,
    "availability": true,
    "description": "A vibrant double room with scenic views.",
    "bedType": "Double Bed",
    "image": "https://thumbs.dreamstime.com/b/modern-hotel-room-floral-wall-mural-large-bed-white-linens-plush-gold-footrest-desk-city-view-ai-generative-decor-326849892.jpg"
  },
  {
    "roomId": 20,
    "roomNumber": "120",
    "type": "Suite",
    "price": 400,
    "availability": true,
    "description": "An ultra-luxury suite with exclusive services.",
    "bedType": "King Bed",
    "image": "https://media.istockphoto.com/id/1035603262/photo/3d-render-of-luxury-hotel-lobby-entrance-reception.jpg?s=612x612&w=0&k=20&c=2HjCO3fUpmDovGnfjvwJRytKB5ciUvppGPhrkzKjMqc="
  }
]


app.get("/", (req, res) => {
  res.send("Server is Running...")
});
// app.get("/rooms", (req, res) => {
//   res.send('all room data :', rooms)
// });

// MongoDB Connection URI
const uri = "mongodb+srv://polokshahi338:gWn4xgYwZgokCga7@cluster0.f3bbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("Hotel");
    const hotelCollection = database.collection("hotelCollection");

    // Insert room data into MongoDB (if not already present)
    const roomCount = await hotelCollection.countDocuments();
    if (roomCount === 0) {
      await hotelCollection.insertMany(rooms);
      console.log('Room data inserted into MongoDB');
    } else {
      console.log('Room data already exists in MongoDB');
    }

    // Route to get all rooms
    app.get('/rooms', async (req, res) => {
      try {
        const rooms = await hotelCollection.find().toArray();
        res.json(rooms);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch room data' });
      }
    });


    // app.post('/myBooking', (req, res) => {

    //   const myBooking = req.body;
    //   console.log(myBooking);
    //   res.json({ message: 'Your booking has been confirmed!' });

    //   hotelCollection.insertOne(myBooking);

    // })

    // app.get('/myBooking', async (req, res) => {
    //   try {
    //     const myBooking = await hotelCollection.find().toArray();
    //     res.json(myBooking);
    //   } catch (error) {
    //     res.status(500).json({ error: 'Failed to fetch booking data' });
    //   }
    // });


    app.post('/book-room', (req, res) => {
      const { roomId, selectedDate } = req.body;
      const room = rooms.find(r => r.roomId === parseInt(roomId));
    
      if (room) {
        // Save booking data (you can update the availability or add a bookings array)
        room.availability = false;
        room.bookingDate = selectedDate;
    
        return res.status(200).json({ success: true, message: 'Room booked successfully!' });
      } else {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
    });


    app.get('/book-room', (req, res) => {
      const bookedRooms = rooms.filter((room) => !room.availability);

      if (bookedRooms.length === 0) {
        return res.status(404).json({ success: false, message: 'No rooms have been booked yet' });
      }

      return res.json({ success: true, bookedRooms });
    });




    app.post('/update-booking-date', (req, res) => {
      const { roomId, newDate } = req.body;

      console.log(roomId, newDate);

      const room = rooms.find((r) => r.roomId == roomId);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }

      // Update the booking date in the room data (or database)
      room.bookedDate = newDate;

      // Respond with success
      return res.json({ success: true, message: 'Booking date updated successfully', updatedRoom: room });
    });






    














    // Ping MongoDB to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}




// async function run() {
//   try {
//     // Connect to MongoDB
//     await client.connect();
//     const database = client.db("BookHotel");
//     const BookData = database.collection("BookData");


//      // Insert room data into MongoDB (if not already present)
  
    




//     // Ping MongoDB to confirm connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Successfully connected to MongoDB!");

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }























// Start the MongoDB connection and API server
run().catch(console.dir);

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'This is an API endpoint' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



