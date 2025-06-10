"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const circles = circleRefs.current.filter(Boolean);

    // Animate circles scaling and color
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    circles.forEach((circle, i) => {
      tl.to(
        circle,
        {
          scale: 1.5,
          transformOrigin: "50% 50%",
          fill: i % 2 === 0 ? "#1E90FF" : "#FF6347",
          duration: 0.8,
          ease: "power1.inOut",
        },
        i * 0.2
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      aria-busy="true"
      aria-label="Loading animation"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          ref={(el) => (circleRefs.current[0] = el)}
          cx="30"
          cy="60"
          r="15"
          fill="#1E90FF"
        />
        <circle
          ref={(el) => (circleRefs.current[1] = el)}
          cx="60"
          cy="60"
          r="15"
          fill="#FF6347"
        />
        <circle
          ref={(el) => (circleRefs.current[2] = el)}
          cx="90"
          cy="60"
          r="15"
          fill="#1E90FF"
        />
        <circle
          ref={(el) => (circleRefs.current[3] = el)}
          cx="60"
          cy="30"
          r="15"
          fill="#FF6347"
        />
        <circle
          ref={(el) => (circleRefs.current[4] = el)}
          cx="60"
          cy="90"
          r="15"
          fill="#1E90FF"
        />
      </svg>
    </div>
  );
};

const Header1 = () => {
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hasSeenLoader = localStorage.getItem("hasSeenLoader");

    if (!hasSeenLoader) {
      setLoading(true);

      timerId.current = setTimeout(() => {
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              setLoading(false);
              localStorage.setItem("hasSeenLoader", "true");
            },
          });
        } else {
          setLoading(false);
          localStorage.setItem("hasSeenLoader", "true");
        }
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (!loading && textRef.current) {
      // GSAP animation for the text when it appears
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power1.inOut" },
      });

      tl.fromTo(
        textRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      ).to(textRef.current, {
        y: -10,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
      });

      return () => {
        tl.kill();
      };
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}

      {!loading && (
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={42} height={42} />
          <span
            ref={textRef}
            className="text-xl font-semibold tracking-wide hidden md:inline-block"
          >
            The <i>Drott</i>
          </span>
        </Link>
      )}
    </>
  );
};

export default Header1;
