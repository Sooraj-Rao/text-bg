"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  const images = [
    { src: "/hero/1.png", width: 300, height: 400 },
    { src: "/hero/2.png", width: 400, height: 300 },
    { src: "/hero/3.png", width: 300, height: 300 },
    { src: "/hero/4.png", width: 400, height: 500 },
    { src: "/hero/3.png", width: 500, height: 300 },
    { src: "/hero/2.png", width: 300, height: 400 },
    { src: "/hero/1.png", width: 400, height: 400 },
    { src: "/hero/4.png", width: 500, height: 300 },
    { src: "/hero/3.png", width: 300, height: 500 },
    { src: "/hero/1.png", width: 400, height: 300 },
    { src: "/hero/4.png", width: 300, height: 400 },
    { src: "/hero/2.png", width: 500, height: 400 },
  ];

  const [scrollY, setScrollY] = useState(0);

  // Update scroll position on scroll event
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100">
      <header className="container mx-auto px-4 pt-16 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Capture Moments, Create Stories
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform your memories into stunning visual narratives with our
          AI-powered image storytelling platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Story
          </Button>
        </motion.div>
      </header>

      <motion.div
        className="container mx-auto px-4 my-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                height: img.height,
                width: "100%",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Translate the image container based on scroll */}
              <motion.div
                style={{
                  transform: `translateY(${scrollY * 0.1 * (i + 1)}px)`, // The further down the page, the more the image moves
                }}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={`Inspiring image ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <footer className="container mx-auto px-4 py-12 text-center">
        <motion.p
          className="text-xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join thousands of storytellers who have already brought their images
          to life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Button className="rounded-full px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Try It Now
          </Button>
        </motion.div>
      </footer>
    </div>
  );
}
