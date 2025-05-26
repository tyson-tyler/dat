"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  beforeChange: (oldIndex: number, newIndex: number) => {
    setActiveIndex(newIndex); // update animation index
  },
};

const slides = [
  {
    image: "/images/slide-01.jpg",
    label: "Women Collection 2025",
    title: "NEW SEASON",
  },
  {
    image: "/images/slide-02.jpg",
    label: "Men New-Season",
    title: "Jackets & Coats",
  },
  {
    image: "/images/slide-03.jpg",
    label: "Men Collection 2025",
    title: "New arrivals",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full">
      <Slider
        {...{
          ...sliderSettings,
          beforeChange: (_: number, next: number) => setActiveIndex(next),
        }}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[600px] bg-cover bg-center flex items-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="container mx-auto px-6 md:px-16 text-white">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="max-w-xl space-y-6"
                    >
                      <span className="text-3xl font-light">{slide.label}</span>
                      <h2 className="text-5xl font-bold">{slide.title}</h2>
                      <Link href="/product">
                        <div className="inline-block bg-black text-white px-6 py-3 text-sm font-semibold uppercase hover:bg-gray-800 transition-all duration-300">
                          Shop Now
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
