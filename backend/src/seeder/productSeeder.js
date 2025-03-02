const Product = require("../models/product");

module.exports = async () => {
  try {
    const dbData = await Product.find();

    if (dbData.length) return;

    const data = [
      {
        stock: 150,
        price: 19.99,
        name: "Eco-Friendly Water Bottle",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "This reusable, eco-friendly water bottle is made from high-quality stainless steel to keep your drinks cold for 24 hours or hot for 12. It features a leak-proof lid, a sleek design, and is perfect for both outdoor adventures and everyday use. Say goodbye to single-use plastics and hydrate sustainably.",
      },
      {
        stock: 75,
        price: 129.99,
        name: "Smart Home Security Camera",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Stay connected to your home with this advanced Smart Home Security Camera. It offers HD resolution, motion detection, night vision, and remote access via a mobile app. Perfect for enhancing the security of your home or office with ease. Alerts are sent directly to your phone if motion is detected.",
      },
      {
        stock: 200,
        price: 49.99,
        name: "Wireless Earbuds",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "These wireless earbuds deliver premium sound quality with deep bass and crystal-clear treble. The ergonomic design ensures a comfortable fit for all-day wear. With a 10-hour battery life and a sleek charging case, they are perfect for music lovers and on-the-go professionals.",
      },
      {
        stock: 50,
        price: 79.99,
        name: "Portable Bluetooth Speaker",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Enjoy powerful sound on the go with this portable Bluetooth speaker. It delivers crisp audio with deep bass and can connect wirelessly to your phone or other devices. The compact design is perfect for travel, and it has an IPX7 waterproof rating, so it can withstand splashes or rain.",
      },
      {
        stock: 120,
        price: 69.99,
        name: "Fitness Tracker Watch",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Track your health and fitness with this sleek fitness tracker watch. It monitors your heart rate, steps, calories burned, and sleep patterns. The watch syncs with your smartphone to keep track of your progress. Stay on top of your wellness goals with this stylish and functional accessory.",
      },
      {
        stock: 180,
        price: 39.99,
        name: "Electric Toothbrush",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "This advanced electric toothbrush offers 5 cleaning modes, a 2-minute timer, and up to 40,000 strokes per minute for superior cleaning. It features a long-lasting battery and is gentle on gums, ensuring you get a thorough yet comfortable brushing experience every time.",
      },
      {
        stock: 60,
        price: 499.99,
        name: "Compact DSLR Camera",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Capture high-quality images and videos with this compact DSLR camera. It boasts a 24.2 MP sensor, 4K video recording, and a fast autofocus system. Perfect for both amateur and professional photographers, this camera offers versatility and portability in one sleek package.",
      },
      {
        stock: 100,
        price: 29.99,
        name: "Electric Kettle",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Boil water quickly and efficiently with this stylish electric kettle. With a 1.7-liter capacity, a rapid boil function, and an automatic shut-off feature, it's a must-have for your kitchen. The stainless steel body is durable, and the cordless design makes it easy to pour.",
      },
      {
        stock: 150,
        price: 25.99,
        name: "Portable Power Bank",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Never run out of battery again with this high-capacity portable power bank. With dual USB ports, it can charge multiple devices simultaneously, providing up to 3 full charges for your phone. Its compact size makes it easy to carry in your bag or pocket.",
      },
      {
        stock: 250,
        price: 24.99,
        name: "Yoga Mat",
        image:
          "https://images.pexels.com/photos/30704109/pexels-photo-30704109/free-photo-of-outdoor-market-at-vienna-city-hall-in-autumn.jpeg",
        description:
          "Enhance your yoga practice with this non-slip, extra-thick yoga mat. Made from eco-friendly TPE material, it provides excellent cushioning and support for your joints during workouts. It's lightweight and easy to roll up, making it convenient for travel or storage.",
      },
    ];

    const insertedData = await Product.insertMany(data);
    console.info(`${insertedData.length} products inserted`);
  } catch (error) {
    console.error(error);
  }
};
