"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Mainnav from "../../navbar/mainnav";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.7, 0, 0.1, 1.2");

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
    img: "/1.jpg",
    title: "Urban Style",
    description:
      "Elevate your streetwear game with urban-inspired comfort and flair.",
  },
  {
    img: "/3.jpg",
    title: "Cozy Fit",
    description:
      "Wrap yourself in warmth with our ultra-soft, cozy-fit t-shirts.",
  },
  {
    img: "/5.jpg",
    title: "Classic White",
    description:
      "Timeless, versatile, and always in style — the essential white tee.",
  },
  {
    img: "/6.jpg",
    title: "Bold & Bright",
    description: "Make a statement with vibrant colors and standout prints.",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const animateSlide = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "hop" } });

      // Background transition
      tl.set(imgRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 1.15,
        opacity: 0,
      })
        .to(imgRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 0.9,
        })

        // Title animation
        .fromTo(
          titleRef.current?.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.5"
        )

        // Description
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.3"
        )

        // Button
        .fromTo(
          btnRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.6)",
          },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  };

  // Split heading into span letters
  const splitLetters = (word: string) =>
    word.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char}
      </span>
    ));

  useEffect(() => {
    animateSlide();
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Mainnav />
      </div>

      {/* Background Image */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-full z-0 transition-all"
      >
        <Image
          src={slideData[index].img}
          alt="carousel"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text and CTA */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          {splitLetters(`${words[index]} `)} T-Shirts
        </h1>
        <p
          ref={descRef}
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mt-4"
        >
          {slideData[index].description}
        </p>
        <button
          ref={btnRef}
          className={`mt-6 px-6 py-3 sm:px-8 cursor-pointer sm:py-4 rounded-full font-semibold text-white text-sm sm:text-base transition-all hover:scale-105 ${buttonColors[index]}`}
        >
          Shop Now
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-24 sm:bottom-20 right-1/2 translate-x-1/2 flex gap-4 z-20">
        <button
          onClick={() =>
            setIndex((index - 1 + slideData.length) % slideData.length)
          }
          className="w-10 h-10 rounded-full bg-white/30 text-white font-bold hover:bg-white hover:text-black transition"
        >
          &lt;
        </button>
        <button
          onClick={() => setIndex((index + 1) % slideData.length)}
          className="w-10 h-10 rounded-full bg-white/30 text-white font-bold hover:bg-white hover:text-black transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
