"use client";

import { motion } from "framer-motion";

export function ProcessingAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="w-16 h-16"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        }}
      >
        <motion.div
          className="w-full h-full bg-white"
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}
