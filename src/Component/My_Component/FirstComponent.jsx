import React from 'react';

const FirstComponent = () => {

    const items = [
        {
            image: "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=",
            text: "Amazing View Room",
        },
        {
            image: "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=",
            text: "Stunning Nature Room",
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0JxgI2qCHTsxA7QPfdfjYhu9rf6CT_-1mAA&s",
            text: "Peaceful Landscape Room",
        },
        {
            image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
            text: "Captivating Horizon Room",
        },
        {
            image: "https://image-tc.galaxy.tf/wijpeg-5q7kwqrkpzrfm7au40q5o403i/presidential-suite-bedroom1.jpg?width=2000",
            text: "Sunset Room",
        },
    ];

    return (
        <div className="overflow-hidden bg-gray-100 p-4 border border-gray-300 rounded-lg">
        <div className="flex items-center animate-marquee whitespace-nowrap space-x-20">
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <img
                        src={item.image}
                        alt={`Item ${index + 1}`}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <p className="text-lg font-medium text-gray-800">{item.text}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default FirstComponent;