"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  setImage: (image: string | null) => void;
}

export default function ImageUploader({ setImage }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
          setError(null);
        };
        reader.readAsDataURL(file);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="mb-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
          isDragActive ? "border-primary" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button className="mt-2" onClick={() => setImage(null)}>
        Clear Image
      </Button>
    </div>
  );
}
