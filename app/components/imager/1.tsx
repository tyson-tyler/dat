"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.pinimg.com/736x/cb/6e/0e/cb6e0e9234d879cb482e96fde1ec4c29.jpg",
  "https://i.pinimg.com/736x/89/5d/4f/895d4f09d75f7d82422e50269c574f70.jpg",
  "https://i.pinimg.com/736x/85/a8/64/85a864e13c643857e13ee12a7ab4de51.jpg",
  "https://i.pinimg.com/736x/10/9f/78/109f78b07216889bce1bb046cf8ce86f.jpg",
];

const ImageChanger1 = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 rotate-45 z-50 w-[300px] h-[400px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Image ${index + 1}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover rounded-xl shadow-xl"
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageChanger1;
