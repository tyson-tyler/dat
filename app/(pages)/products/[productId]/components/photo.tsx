"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

export default function Photos({ imageList }: { imageList: string[] }) {
  const [selectedImage, setSelectedImage] = useState(imageList?.[0]);

  if (!imageList || imageList.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg text-gray-500">
        No images available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center p-4">
      {/* Main Image Display */}
      <div className="relative w-full max-w-2xl lg:max-w-4xl h-[900px] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={selectedImage}
              alt="Selected product image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-full rounded-xl"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:justify-center items-center gap-3 md:gap-4 p-3 bg-white rounded-xl shadow-inner w-full max-w-4xl">
        {imageList.map((item, index) => {
          const isActive = item === selectedImage;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(item)}
              className={clsx(
                "relative flex-shrink-0 overflow-hidden rounded-md transition-all",
                "w-[65px] h-[65px] sm:w-[80px] sm:h-[80px]",
                isActive
                  ? "ring-2 ring-blue-500 ring-offset-2 shadow"
                  : "border border-gray-200 hover:border-blue-400"
              )}
              aria-label={`Thumbnail ${index + 1}`}
            >
              <Image
                src={item}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
