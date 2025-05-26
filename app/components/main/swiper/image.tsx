"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.ibb.co/5gBVMzm4/wp9309844-Photoroom.png",
  "https://i.ibb.co/fzBqBzJp/wp5005735-Photoroom.png",
  "https://i.ibb.co/r2Nq5P9x/pexels-julia-kuzenkov-442028-1188748-Photoroom.png",
  "https://i.ibb.co/B5kYJm7V/pexels-sidlaya-3053824-Photoroom.png",
];

// Define entry directions for each image
const entryDirections = [
  { x: -200, y: 0 },
  { x: 200, y: 0 },
  { x: 0, y: -200 },
  { x: 0, y: 200 },
];

const ImageChanger = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentDirection = entryDirections[index % entryDirections.length];

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative w-[700px] h-[700px] rounded-full overflow-hidden shadow-2xl border-8 border-white z-50">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Image ${index + 1}`}
            initial={{ opacity: 0, ...currentDirection }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...currentDirection }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageChanger;
