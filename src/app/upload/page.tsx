"use client";

import type React from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextCustomizer from "@/components/editor/text-customizer";
import { PlusIcon, UploadIcon, DownloadIcon } from "lucide-react";

interface TextSet {
  id: number;
  text: string;
  fontFamily: string;
  top: number;
  left: number;
  color: string;
  fontSize: number;
  bold: number;
  opacity: number;
  shadowColor: string;
  shadowSize: number;
}

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(
    null
  );
  const [textSets, setTextSets] = useState<TextSet[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUploadImage = () => {
    if (selectedImage) {
      setSelectedImage(null);
      setTextSets([]);
      setRemovedBgImageUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsImageSetupDone(false);
      setUploadProgress(0);
      await setupImage(file);
    }
  };

  const setupImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://rembg.sj1.xyz/remove-bg/file/", {
        method: "POST",
        body: formData,
      });

      const reader = response.body?.getReader();
      const contentLength = +(response.headers.get("Content-Length") ?? "0");
      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      if (!reader) {
        return null;
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
        setUploadProgress(Math.round((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks);
      const imageUrl = URL.createObjectURL(blob);
      setRemovedBgImageUrl(imageUrl);
      setIsImageSetupDone(true);
    } catch (error) {
      console.error(error);
      setIsImageSetupDone(true);
    }
  };

  const addNewTextSet = () => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [
      ...prev,
      {
        id: newId,
        text: "text",
        fontFamily: "Inter",
        top: 0,
        left: 0,
        color: "white",
        fontSize: 100,
        bold: 800,
        opacity: 1,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowSize: 4,
      },
    ]);
  };

  const handleAttributeChange = (
    id: number,
    attribute: string,
    value: string | number
  ) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [attribute]: value } : set))
    );
  };

  const duplicateTextSet = (textSet: TextSet) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const removeTextSet = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const saveCompositeImage = () => {
    if (!canvasRef.current || !isImageSetupDone) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new window.Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      textSets.forEach((textSet) => {
        ctx.save();

        const fontSize = textSet.fontSize;
        ctx.font = `${textSet.bold} ${fontSize}px ${textSet.fontFamily}`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        ctx.translate(x, y);

        // Apply rotation
        ctx.rotate((0 * Math.PI) / 180);

        // Apply 3D transforms
        const radianX = (0 * Math.PI) / 180;
        const radianY = (0 * Math.PI) / 180;
        ctx.transform(1, Math.tan(radianY), -Math.tan(radianX), 1, 0, 0);

        // Apply text shadow
        if (textSet.shadowSize > 0) {
          ctx.shadowColor = textSet.shadowColor;
          ctx.shadowBlur = textSet.shadowSize;
          ctx.shadowOffsetX = textSet.shadowSize / 2;
          ctx.shadowOffsetY = textSet.shadowSize / 2;
        }

        ctx.fillText(textSet.text, 0, 0);
        ctx.restore();
      });

      if (removedBgImageUrl) {
        const removedBgImg = new window.Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
          triggerDownload(canvas);
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload(canvas);
      }
    };
    bgImg.src = selectedImage || "";
  };

  function triggerDownload(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `edited_image.png`;
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between p-5 bg-gray-100">
        <h1 className="text-2xl font-bold">Image Editor</h1>
        <div className="flex gap-2">
          <Button variant="link" onClick={handleUploadImage}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload New Image
          </Button>
        </div>
      </header>
      <Separator />
      <main className="flex-grow p-5">
        {selectedImage ? (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2">
              <div className="relative  aspect-square border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Uploaded"
                  layout="fill"
                  objectFit="contain"
                />
                {!isImageSetupDone && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <p className="mb-2">Processing image...</p>
                    {uploadProgress}%
                  </div>
                )}
                {isImageSetupDone &&
                  textSets.map((textSet) => (
                    <div
                      key={textSet.id}
                      style={{
                        position: "absolute",
                        top: `${50 - textSet.top}%`,
                        left: `${textSet.left + 50}%`,
                        transform: `
                        translate(-50%, -50%) 
                        rotate(${0}deg)
                        perspective(1000px)
                        rotateX(${0}deg)
                        rotateY(${0}deg)
                      `,
                        color: textSet.color,
                        textAlign: "center",
                        fontSize: `${textSet.fontSize}px`,
                        fontWeight: textSet.bold,
                        fontFamily: textSet.fontFamily,
                        opacity: textSet.opacity,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {textSet.text}
                    </div>
                  ))}
                {removedBgImageUrl && (
                  <Image
                    src={removedBgImageUrl || "/placeholder.svg"}
                    alt="Removed bg"
                    layout="fill"
                    objectFit="contain"
                    className="absolute top-0 left-0"
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex justify-between items-center mb-3">
                <Button variant="outline" onClick={addNewTextSet}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add New Text
                </Button>
                {textSets.length !== 0 && (
                  <Button onClick={saveCompositeImage}>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Save Image
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <Accordion type="single" collapsible className="space-y-3">
                  {textSets.map((textSet) => (
                    <TextCustomizer
                      key={textSet.id}
                      textSet={textSet}
                      handleAttributeChange={handleAttributeChange}
                      removeTextSet={removeTextSet}
                      duplicateTextSet={duplicateTextSet}
                    />
                  ))}
                </Accordion>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-xl font-semibold">
                Upload an image to get started
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <Button onClick={handleUploadImage} className="mt-4">
                Choose file
              </Button>
            </div>
          </div>
        )}
      </main>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
