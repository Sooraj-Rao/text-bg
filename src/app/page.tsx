"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTxUPWByNhmiVH3N0dKV33BDJF6Zbq5e_0g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuthCL6b2VppJqskqCd5A12rIu8VCYrr2aw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8UB2vnbDmEtxJD8546Ht7gS8TfCg2ibs5Phfc5rDJg3cQE0Lz77aiAbVAd7Jp-39I2UM&usqp=CAU",
];

export default function Home() {
  const [views, setViews] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  React.useEffect(() => {
    setViews(Math.floor(Math.random() * 10000) + 500);
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#cfd9df] text-gray-900">
      {/* Header */}
      <header className="absolute top-5 left-1/2 transform -translate-x-1/2 flex w-[90%] max-w-4xl items-center justify-between px-6 py-3 rounded-xl bg-white/30 backdrop-blur-md shadow-lg border border-white/50">
        <span className="text-2xl font-extrabold tracking-wide text-gray-800">
          🚀 Textify
        </span>
        <nav className="flex gap-8 text-lg font-medium text-gray-700">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="#features" className="hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#about" className="hover:text-gray-900 transition">
            About
          </Link>
        </nav>
      </header>

      {/* Hero Section + Image Carousel */}
      <div className="relative flex items-center justify-between w-[85%] max-w-5xl">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start w-1/2"
        >
          <h1 className="text-7xl font-extrabold leading-tight text-gray-900">
            Make <span className="text-blue-500 drop-shadow-md">Text</span>{" "}
            <br />
            Behind <span className="text-gray-700 drop-shadow-md">Images</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md">
            The ultimate tool to create sleek, modern text-over-image designs
            effortlessly.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/edit">
              <Button className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:shadow-blue-400/50 rounded-full">
                🚀 Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Carousel (ShadCN with Infinite Scrolling) */}
        <div className="relative w-1/2 flex items-center justify-center">
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
            className="w-full max-w-lg"
          >
            <CarouselContent>
              {images.concat(images).map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-3">
                    <Card className="overflow-hidden shadow-lg rounded-xl border border-white/30 backdrop-blur-md">
                      <CardContent className="flex aspect-video items-center justify-center p-0">
                        <Image
                          width={400}
                          height={250}
                          src={img}
                          alt={`Text Behind Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex w-[90%] max-w-4xl justify-between items-center px-6 py-3 rounded-xl bg-white/30 backdrop-blur-md shadow-lg border border-white/50">
        <span className="text-gray-700">👁️ {views.toLocaleString()} views</span>
        <span>
          Developed by{" "}
          <a
            href="https://github.com/sooraj"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Sooraj
          </a>
        </span>
      </footer>
    </div>
  );
}
