import React from "react";

type Review = {
  name: string;
  message: string;
  rating: number;
  imageLink: string;
};

export default function CustomerReviews() {
  const list: Review[] = [
    {
      name: "Penny Albritton",
      message:
        "Absolutely loved it! The quality exceeded my expectations. Will definitely shop here again.",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-1.jpg?v=1721992196&width=512",
    },
    {
      name: "Oscar Nommanee",
      message:
        "Customer service was top-notch and the delivery was super fast. Highly recommended!",
      rating: 5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-5.jpg?v=1721992196&width=512",
    },
    {
      name: "Emma Watson",
      message:
        "The product was exactly as described. Packaging was neat and safe. Very satisfied.",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-6.jpg?v=1721992197&width=512",
    },
    {
      name: "Liam Carter",
      message:
        "I'm impressed by the attention to detail. This store really values its customers.",
      rating: 5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-2.jpg?v=1721992196&width=512",
    },
    {
      name: "Sophia Patel",
      message:
        "Such a smooth shopping experience. The website was easy to navigate and checkout was quick.",
      rating: 5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-3.jpg?v=1721992196&width=512",
    },
    {
      name: "Noah Kim",
      message:
        "Beautifully crafted and well-made. This was my second order and won’t be my last!",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-4.jpg?v=1721992196&width=512",
    },
  ];

  return (
    <section className="flex justify-center">
      <div className="w-full p-5 md:max-w-[1500px] flex flex-col gap-3">
        <h1 className="text-center font-semibold text-xl mt-8 mb-14 sm:text-xl md:text-3xl lg:text-5xl">
          Our customers love
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-6 rounded-xl justify-center items-center border shadow-sm hover:shadow-md transition duration-300"
            >
              <img
                src={item.imageLink}
                className="h-32 w-32 rounded-full object-cover"
                alt={item.name}
              />
              <h1 className="text-sm font-semibold">{item.name}</h1>

              {/* Simple rating display */}
              <p className="text-yellow-500 text-sm">
                {"★".repeat(Math.floor(item.rating)) +
                  (item.rating % 1 ? "½" : "")}
              </p>

              <p className="text-sm text-gray-500 text-center">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
