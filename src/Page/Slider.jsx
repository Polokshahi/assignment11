import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Slider = () => {
    const fashionSlides = [
        {
          image: 'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
          title: "Spring Collection 2025",
          description: "Experience the freshness of spring with our vibrant designs."
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyK-cmgC_p9EXeFptOpJm4qVqfoz1m4x2nA&s',
          title: "Summer Vibes",
          description: "Stay cool and stylish with our summer collection."
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScob7Gv-KVaxoWzvfdXwUUu6nRvngMYP__446UIryi09HT_s5Uce02vdDsXqAq-y8i8AM&usqp=CAU',
          title: "Autumn Elegance",
          description: "Warm tones and cozy styles for the perfect autumn look."
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGMtmazAY8fpX3gfrLkGa1qoRNwCerJdvUUNhElF_1g0SrzO37RG3VbafeYCG_Opgd6U&usqp=CAU',
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
