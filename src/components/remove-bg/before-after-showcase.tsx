"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { before: "/before1.jpg", after: "/after1.png" },
  { before: "/before2.jpg", after: "/after2.png" },
  { before: "/before3.jpg", after: "/after3.png" },
];

export default function BeforeAfterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">See the Magic</h2>
        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
          <div className="absolute inset-0">
            <Image
              src={images[activeIndex].before || "/placeholder.svg"}
              alt="Before"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={images[activeIndex].after || "/placeholder.svg"}
              alt="After"
              fill
              className="object-cover"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-20 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:bg-white"
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8L22 12L18 16M6 8L2 12L6 16"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-purple-600" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
