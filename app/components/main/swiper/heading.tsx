"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Trending", "Stylish", "Comfortable", "Affordable", "Premium"];
const buttonColors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
];

const HeadingSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image (optional) */}

      {/* Overlay */}
      <div className="absolute inset-0  z-10 flex flex-col justify-center items-center text-center p-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
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
            className="text-gray-200 text-lg md:text-xl max-w-xl px-4 mb-6"
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
          className={`px-8 py-3 text-white font-medium rounded-full shadow-md transition duration-500 ${buttonColors[index]}`}
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
};

export default HeadingSection;
