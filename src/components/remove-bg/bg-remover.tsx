"use client";

import type React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  ImageIcon,
  Download,
  RefreshCw,
  Loader,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PRESET_COLORS = [
  "transparent",
  "#FF4136", // Red
  "#FF6B6B", // Pink
  "#B10DC9", // Purple
  "#6B5B95", // Dark Purple
  "#4A90E2", // Blue
  "#39CCCC", // Cyan
  "#2ECC40", // Green
  "#FFDC00", // Yellow
  "#FF851B", // Orange
  "#FFFFFF", // White
  "#AAAAAA", // Gray
  "#111111", // Black
];

const SAMPLE_BACKGROUNDS = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
];

export default function BGRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");
  const [blurAmount, setBlurAmount] = useState(0);
  const [isBlurMode, setIsBlurMode] = useState(false);
  const [showBgDialog, setShowBgDialog] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [compareValue, setCompareValue] = useState(100);
  const [isComparing, setIsComparing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
        setResult(null);
        setBlurAmount(0);
        setIsComparing(false);
      }
    },
    []
  );

  const handleRemoveBackground = useCallback(async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://rembg.sj1.xyz/remove-bg/file/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const blob = await response.blob();
      setResult(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleBgImageSelect = (url: string) => {
    setBgImage(url);
    setShowBgDialog(false);
    setIsBlurMode(false);
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
        setShowBgDialog(false);
        setIsBlurMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImage = useCallback(() => {
    if (!result || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    const draw = async () => {
      try {
        const fgImage = await loadImage(result);
        canvas.width = fgImage.width;
        canvas.height = fgImage.height;

        if (isBlurMode && preview) {
          const blurBg = await loadImage(preview);
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(blurBg, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
        } else if (bgImage) {
          const bgImg = await loadImage(bgImage);
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);

        // If comparing, draw the comparison slider
        if (isComparing) {
          const originalImg = await loadImage(preview!);
          const width = (compareValue / 100) * canvas.width;

          ctx.drawImage(
            originalImg,
            width,
            0,
            canvas.width - width,
            canvas.height,
            width,
            0,
            canvas.width - width,
            canvas.height
          );

          // Draw divider line
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(width, 0);
          ctx.lineTo(width, canvas.height);
          ctx.stroke();

          // Draw slider handle
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(width, canvas.height / 2, 10, 0, 2 * Math.PI);
          ctx.fill();

          // Draw arrows
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.moveTo(width - 5, canvas.height / 2);
          ctx.lineTo(width - 10, canvas.height / 2 - 5);
          ctx.lineTo(width - 10, canvas.height / 2 + 5);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(width + 5, canvas.height / 2);
          ctx.lineTo(width + 10, canvas.height / 2 - 5);
          ctx.lineTo(width + 10, canvas.height / 2 + 5);
          ctx.fill();
        }
      } catch (error) {
        console.error("Error rendering image:", error);
      }
    };

    draw();
  }, [
    result,
    bgColor,
    bgImage,
    isBlurMode,
    blurAmount,
    preview,
    isComparing,
    compareValue,
  ]);

  useEffect(() => {
    renderImage();
  }, [renderImage]);

  const handleCompareChange = useCallback(
    (value: number[]) => {
      setTimeout(() => {
        setCompareValue(value[0]);
        renderImage();
      }, 200);
    },
    [renderImage]
  );

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isComparing || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;

      setCompareValue(percentage);
      renderImage();

      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setCompareValue(percentage);
        renderImage();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isComparing, renderImage]
  );

  useEffect(() => {
    if (isProcessing) {
      const processImage = async () => {
        await handleRemoveBackground();
        setIsProcessing(false);
      };
      processImage();
    }
  }, [isProcessing, handleRemoveBackground]);

  const sampleImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "removed_background.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setLoading(false);
    setBgColor("transparent");
    setBlurAmount(0);
    setIsBlurMode(false);
    setBgImage(null);
    setCompareValue(100);
    setIsComparing(false);
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-radial from-teal-400 to-green-600 flex flex-col">
      <nav className="/10 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 " />
              <span className="ml-2 text-xl font-semibold ">BGRemover</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className=" hover:-200">
                Features
              </Button>
              <Button variant="ghost" className=" hover:-200">
                Pricing
              </Button>
              <Button variant="ghost" className=" hover:-200">
                Log in
              </Button>
              <Button className=" -600 hover:-100">Sign up</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {!preview ? (
          <div className="text-center space-y-6  w-full">
            <h1 className="text-7xl py-2 font-bold bg-gradient-to-r from-green-500 to-green-700  bg-clip-text text-transparent">
              Remove Image Background
            </h1>
            <p className="text-xl ">100% Automatically and Free</p>

            <div className="mt-8  text-center  flex justify-center transition-colors">
              <label className="cursor-pointer block  border-2 border-dashed  rounded-lg py-12 px-20">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className=" flex justify-center gap-x-1 ">
                  <Upload className="mr-2" />
                  Upload Image
                </div>
                <p className="mt-4 text-sm -100">
                  or drop a file, paste image or URL
                </p>
              </label>
            </div>

            <div className="mt-8">
              <p className="text-sm -100 mb-4">No image? Try one of these:</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {sampleImages.map((src, i) => (
                  <img
                    key={i}
                    src={src || "/placeholder.svg"}
                    alt={`Sample ${i + 1}`}
                    width={100}
                    height={100}
                    className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
            <div className="flex-1  rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-square">
                {loading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 ">
                    <p className="flex gap-x-2 bg-black/50 p-2 rounded-lg">
                      Processing image
                      <Loader className="animate-spin" />
                    </p>
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                  onMouseDown={handleCanvasMouseDown}
                />
              </div>

              {result && (
                <div className="p-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsComparing(!isComparing)}
                      className="flex-1"
                    >
                      {isComparing ? "Exit Compare" : "Compare"}
                    </Button>
                    {isComparing && (
                      <div className="flex-1">
                        <Slider
                          value={[compareValue]}
                          onValueChange={handleCompareChange}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold ">Image Settings</h2>
                {!result ? (
                  <Button
                    onClick={() => setIsProcessing(true)}
                    disabled={loading || isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 "
                  >
                    {loading || isProcessing
                      ? "Processing..."
                      : "Remove Background"}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-4 /10 backdrop-blur-md p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <Label className="">Blur Background:</Label>
                        <Switch
                          checked={isBlurMode}
                          onCheckedChange={(checked) => {
                            setIsBlurMode(checked);
                            if (checked) {
                              setBgImage(null);
                              setBgColor("transparent");
                            }
                          }}
                        />
                      </div>

                      {isBlurMode ? (
                        <div>
                          <Label className="">Blur Amount:</Label>
                          <Slider
                            min={0}
                            max={20}
                            step={0.1}
                            value={[blurAmount]}
                            onValueChange={(value) => setBlurAmount(value[0])}
                            className="mt-2"
                          />
                        </div>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => setShowBgDialog(true)}
                            className="w-full  border-white hover:/20"
                          >
                            Choose Background
                          </Button>

                          <div className="grid grid-cols-6 gap-2">
                            {PRESET_COLORS.map((color) => (
                              <button
                                key={color}
                                onClick={() => {
                                  setBgColor(color);
                                  setBgImage(null);
                                }}
                                className={`w-full aspect-square rounded-lg border-2 ${
                                  bgColor === color
                                    ? "border-white"
                                    : "border-transparent"
                                }`}
                                style={{
                                  background:
                                    color === "transparent"
                                      ? "repeating-codepoint-pattern(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee) 0 0/20px 20px"
                                      : color,
                                }}
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={bgColor}
                              onChange={(e) => {
                                setBgColor(e.target.value);
                                setBgImage(null);
                              }}
                              className="w-10 h-10 p-1 rounded"
                            />
                            <span className="">Custom Color</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Button
                      onClick={handleDownload}
                      className="w-full  text-green-600 hover:bg-green-100"
                    >
                      <Download className="mr-2" />
                      Download Image
                    </Button>
                  </>
                )}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full  border-white hover:/20"
                >
                  <RefreshCw className="mr-2" />
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Dialog open={showBgDialog} onOpenChange={setShowBgDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose Background</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="photo">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="photo">Photo</TabsTrigger>
              <TabsTrigger value="color">Color</TabsTrigger>
            </TabsList>
            <TabsContent value="photo" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search backgrounds..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <label className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleCustomBgUpload}
                    accept="image/*"
                  />
                  <Plus className="w-8 h-8 text-gray-400" />
                </label>
                {SAMPLE_BACKGROUNDS.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => handleBgImageSelect(bg)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 hover:border-primary"
                  >
                    <img
                      src={bg || "/placeholder.svg"}
                      alt={`Background ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="color" className="grid grid-cols-6 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setBgColor(color);
                    setBgImage(null);
                    setShowBgDialog(false);
                  }}
                  className="aspect-square rounded-lg border-2 hover:border-primary"
                  style={{
                    background:
                      color === "transparent"
                        ? "repeating-codepoint-pattern(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee) 0 0/20px 20px"
                        : color,
                  }}
                />
              ))}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
