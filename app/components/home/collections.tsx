"use client";

import { useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

type Collection = {
  id: string;
  title: string;
  subtitle: string;
  imageURL: string;
};

type CollectionSliderProps = {
  collections: Collection[];
};

gsap.registerPlugin(ScrollTrigger);

export default function CollectionSlider({
  collections,
}: CollectionSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const hopTransition = {
    duration: 0.6,
    ease: [0.9, 0, 0.1, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={hopTransition}
      className="relative w-full px-4 mb-5 sm:px-6 md:px-12 py-16"
    >
      {/* Navigation Buttons */}

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 mb-4">
          {collections.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl   transition-shadow duration-500 flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px] snap-start overflow-hidden group relative"
            >
              <Link
                href={`/collections/${item.id}`}
                className="block w-full h-[380px] sm:h-[560px] relative overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.imageURL}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-base sm:text-lg font-semibold tracking-wide">
                    Explore Now
                  </span>
                </div>
              </Link>
              <h2 className="mt-2 text-lg md:text-xl font-semibold text-gray-800 group-hover:text-black transition-colors text-center">
                {item?.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
