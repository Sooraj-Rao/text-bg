"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface PreviewProps {
  image: string | null;
  text: string;
  textStyle: {
    fontSize: number;
    color: string;
    opacity: number;
    x: number;
    y: number;
  };
}

export default function Preview({ image, text, textStyle }: PreviewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className="relative w-full h-[500px] border rounded-md overflow-hidden"
    >
      {image && (
        <img
          src={image || "/placeholder.svg"}
          alt="Uploaded"
          className="w-full h-full object-contain"
        />
      )}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          fontSize: `${textStyle.fontSize}px`,
          color: textStyle.color,
          opacity: textStyle.opacity,
          cursor: isDragging ? "grabbing" : "grab",
          x: textStyle.x,
          y: textStyle.y,
        }}
        className="absolute top-0 left-0 whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}
