"use client"

import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero({ onUpload }: { onUpload: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-8"
    >
      <h1 className="text-4xl font-bold text-purple-800">Background Remover</h1>
      <p className="text-xl text-purple-600">Upload an image and watch the magic happen!</p>
      <Button onClick={onUpload} size="lg">
        <Upload className="mr-2" />
        Upload Image
      </Button>
    </motion.div>
  )
}

