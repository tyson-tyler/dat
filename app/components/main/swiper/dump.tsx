"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Mainnav from "../../navbar/mainnav";

const words = ["Trending", "Stylish", "Comfortable", "Affordable", "Premium"];
const buttonColors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
];

const slideData = [
  {
    img: "/images/img1.jpg",
    title: "Urban Style",
  },
  {
    img: "/images/img2.jpg",
    title: "Cozy Fit",
  },
  {
    img: "/images/img3.jpg",
    title: "Classic White",
  },
  {
    img: "/images/img4.jpg",
    title: "Bold & Bright",
  },
];

const Carousel = () => {
  const [list, setList] = useState(slideData);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const autoSlide = setInterval(() => handleSlide("next"), 7000);
    return () => clearInterval(autoSlide);
  }, [list]);

  const handleSlide = (type: "next" | "prev") => {
    const newList = [...list];
    const newIndex =
      type === "next"
        ? (index + 1) % words.length
        : (index - 1 + words.length) % words.length;
    setIndex(newIndex);

    if (type === "next") newList.push(newList.shift()!);
    else newList.unshift(newList.pop()!);

    setDirection(type);
    setList(newList);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDirection(null), 500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-30">
        <Mainnav />
      </div>

      {/* Main Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={list[0].img}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={list[0].img}
              alt="main-carousel"
              layout="fill"
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {words[index]} T-Shirts
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${words[index]}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mb-6"
          >
            Discover our collection of {words[index].toLowerCase()} t-shirts
            designed for comfort, quality, and modern fashion.
          </motion.p>
        </AnimatePresence>

        <motion.button
          key={`btn-${index}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`px-6 py-2 sm:px-8 sm:py-3 text-white text-sm sm:text-base font-medium rounded-full shadow-md transition duration-500 ${buttonColors[index]}`}
        >
          Shop Now
        </motion.button>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-full px-4 overflow-x-auto">
        <div className="flex gap-4 sm:gap-5 justify-center min-w-[300px] sm:min-w-[600px]">
          {list.map((slide, idx) => (
            <div
              key={idx}
              className="w-[100px] sm:w-[150px] h-[140px] sm:h-[220px] relative overflow-hidden rounded-xl sm:rounded-2xl shrink-0"
            >
              <Image
                src={slide.img}
                alt={`thumb-${idx}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center text-white text-xs sm:text-sm px-2">
                <div className="font-semibold text-sm truncate ">
                  {slide.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-28 sm:bottom-20 right-1/2 translate-x-1/2 flex gap-4 z-20">
        <button
          onClick={() => handleSlide("prev")}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/40 text-white font-bold hover:bg-white hover:text-black transition"
        >
          &lt;
        </button>
        <button
          onClick={() => handleSlide("next")}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/40 text-white font-bold hover:bg-white hover:text-black transition"
        >
          &gt;
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-orange-500 z-30 animate-progressBar w-full"></div>
    </div>
  );
};

export default Carousel;
