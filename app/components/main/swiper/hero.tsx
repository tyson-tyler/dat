"use client";

import Image from "next/image";
import React from "react";
import HeadingSection from "./heading";
import ImageChanger from "./image";

const HeroSection = () => {
  return (
    <div className="flex justify-around flex-col items-center min-h-screen">
      <HeadingSection />
    </div>
  );
};

export default HeroSection;
