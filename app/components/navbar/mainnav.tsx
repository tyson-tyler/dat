"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { FaBagShopping } from "react-icons/fa6";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const Mainnav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const onHandleAuthButton = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={classNames(
        "fixed left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "top-0 bg-black text-white shadow-md"
          : "md:top-[60px] top-[40px] bg-transparent text-white"
      )}
    >
      <div className="flex items-center justify-between px-[20px] md:px-[60px] h-[70px]">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="text-xl font-semibold hidden md:flex">
            The Drott
          </span>

          <div className="hidden lg:flex items-center gap-6 font-semibold ml-[80px]">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">Shop</span>
            <span className="cursor-pointer">Features</span>
            <span className="cursor-pointer">Blog</span>
            <span className="cursor-pointer">About</span>
            <span className="cursor-pointer">Contact</span>
          </div>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          <BiSearch className="w-5 h-5" />
          <FaBagShopping className="w-5 h-5" />
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block px-5 py-3 text-sm rounded-full cursor-pointer font-semibold bg-purple-600 text-white shadow-md hover:opacity-90 transition"
            onClick={onHandleAuthButton}
          >
            Join Now
          </motion.button>

          {/* Hamburger Icon on Mobile */}
          <div className="md:hidden">
            {menuOpen ? (
              <BiX className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            ) : (
              <BiMenu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black text-white px-4 pb-4"
          >
            <div className="flex flex-col gap-4 font-semibold pt-4">
              <span className="cursor-pointer">Home</span>
              <span className="cursor-pointer">Shop</span>
              <span className="cursor-pointer">Features</span>
              <span className="cursor-pointer">Blog</span>
              <span className="cursor-pointer">About</span>
              <span className="cursor-pointer">Contact</span>

              <button
                onClick={onHandleAuthButton}
                className="w-full px-4 py-2 mt-2 rounded-full cursor-pointer bg-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mainnav;
