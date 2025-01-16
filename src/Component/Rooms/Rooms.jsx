// import React, { useEffect, useState } from 'react';
// import RoomCard from './RoomCard';
import SectionsTitle from '../../Page/Shared/SectionsTitle';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Page/Shared/SectionsTitle';
import { useEffect } from 'react';

const Rooms = () => {
  useEffect(() => {
    document.title = "Room";
  },[]);

    const {
        data: rooms = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/rooms");
            return res.data;
        },
    });

    // console.log(rooms);

    if (isLoading) {
        return (
            <div className="mt-10 mb-24">
                <SectionTitle
                    title={"Luxurious Accommodations"}
                ></SectionTitle>
                <div className="text-center mt-20">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="text-center mt-10 text-red-500">
                Error: {error.message}
            </div>
        );
    }

      



    return (
        // <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        //   {rooms.map((room, idx) => (
        //     <RoomCard key={idx} room={room} />
        //   ))}
        // </div>

        <div className="mt-10">
            <SectionsTitle
                title={"Luxurious Accommodations"}

            ></SectionsTitle>
            <div className="mt-10 mb-20 container mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                {Array.isArray(rooms) &&
                    rooms?.map((room) => (
                        <Link
                        to={`/rooms/${room._id}`}
                        key={room._id}
                        className="card card-compact bg-base-100 shadow-xl transform hover:-translate-y-2 transition duration-500 border border-base-300"
                      >
                        <figure className="h-52">
                          <img
                            className="object-cover h-full w-full transform hover:scale-105 transition duration-500"
                            src={room.image}
                            alt={`Room ${room.roomNumber}`}
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title text-primary font-bold text-2xl">
                            {`Room ${room.roomNumber} - ${room.type}`}
                          </h2>
                          <div className="space-y-2 text-lg">
                            <p>
                              <span className="font-bold">Description: </span>
                              {room.description}
                            </p>
                            <p>
                              <span className="font-bold">Bed Type: </span>
                              {room.bedType}
                            </p>
                            <p>
                              <span className="font-bold">Price: </span>${room.price} / night
                            </p>
                            <p>
                              <span className="font-bold">Availability: </span>
                              {room.availability ? 'Available' : 'Not Available'}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="font-bold">Rating: </span>
                              <span className="flex items-center gap-5">
                                {`${room.rating || 0}/${room.ratingCount || 0}`}
                                <ReactStars
                                  count={5}
                                  key={room.rating}
                                  value={room.rating || 0}
                                  size={30}
                                  activeColor="#ffd700"
                                  edit={false}
                                  isHalf={true}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                    ))}
            </div>
        </div>









    );
};

export default Rooms;
