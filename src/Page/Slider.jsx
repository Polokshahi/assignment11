import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Slider = () => {
    const fashionSlides = [
        {
          image: '../../public/hotel1.jpeg',
          title: "Spring Collection 2025",
          description: "Experience the freshness of spring with our vibrant designs."
        },
        {
          image: '../../public/hotel2.jpeg',
          title: "Summer Vibes",
          description: "Stay cool and stylish with our summer collection."
        },
        {
          image: '../../public/hotel3.jpeg',
          title: "Autumn Elegance",
          description: "Warm tones and cozy styles for the perfect autumn look."
        },
        {
          image: '../../public/hotel4.jpeg',
          title: "Winter Glam",
          description: "Bundle up in style with luxurious winter wear."
        }
      ];

    return (
        <div className="">
               <div className="max-w-5xl mx-auto p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-2xl shadow-lg overflow-hidden"
      >
        {fashionSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h2 className="text-xl font-bold">{slide.title}</h2>
              <p className="text-sm">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>
    );
};

export default Slider;
