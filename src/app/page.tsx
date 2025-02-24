"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  const images = ["/hero/1.png", "/hero/2.png"];
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-4 pt-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Create{" "}
          <span className="bg-black text-white px-2">text-behind-image</span>{" "}
          designs easily
        </h1>

        <p className="text-gray-600 mb-4">
          200,000+ text behind image designs created
        </p>

        <Button className="rounded-full px-8 mb-8">Open the app</Button>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {images.map((imgUrl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={imgUrl}
                alt={`Grid item ${i + 1}`}
                fill
                className=""
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
