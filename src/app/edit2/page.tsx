"use client";
// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { AlertCircle } from "lucide-react";

// interface ImageEditorProps {
//   imageUrl: string | null;
// }

//  function ImageEditor({ imageUrl }: ImageEditorProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [text, setText] = useState("Your Text");
//   const [fontSize, setFontSize] = useState(100);
//   const [textColor, setTextColor] = useState("#ffffff");
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [font, setFont] = useState("Arial");
//   const [maskPoints, setMaskPoints] = useState<{ x: number; y: number }[]>([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isDraggingText, setIsDraggingText] = useState(false);
//   const [drawingMode, setDrawingMode] = useState<"freehand" | "points">(
//     "freehand"
//   );
//   const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
//     null
//   );
//   const imageRef = useRef<HTMLImageElement | null>(null);
//   const [showTextBounds, setShowTextBounds] = useState(false);

//   useEffect(() => {
//     if (!imageUrl || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const image = new Image();
//     image.crossOrigin = "anonymous";
//     image.src = imageUrl;
//     imageRef.current = image;

//     image.onload = () => {
//       canvas.width = image.width;
//       canvas.height = image.height;
//       drawCanvas();
//     };
//   }, [imageUrl]);

//   const isPointInText = (x: number, y: number) => {
//     if (!canvasRef.current) return false;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return false;

//     ctx.font = `${fontSize}px ${font}`;
//     const metrics = ctx.measureText(text);
//     const textHeight = fontSize;

//     return (
//       x >= position.x &&
//       x <= position.x + metrics.width &&
//       y >= position.y &&
//       y <= position.y + textHeight
//     );
//   };

//   const drawCanvas = () => {
//     if (!canvasRef.current || !imageRef.current) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the original image
//     ctx.drawImage(imageRef.current, 0, 0);

//     // Draw the text
//     ctx.save();
//     ctx.font = `${fontSize}px ${font}`;
//     ctx.fillStyle = textColor;
//     ctx.fillText(text, position.x, position.y + fontSize);

//     // Draw text bounding box if enabled
//     if (showTextBounds) {
//       const metrics = ctx.measureText(text);
//       ctx.strokeStyle = "#00ff00";
//       ctx.lineWidth = 1;
//       ctx.strokeRect(position.x, position.y, metrics.width, fontSize);
//     }
//     ctx.restore();

//     // If we have a mask, draw the foreground object over the text
//     if (maskPoints.length > 2) {
//       ctx.save();
//       ctx.beginPath();
//       ctx.moveTo(maskPoints[0].x, maskPoints[0].y);
//       for (let i = 1; i < maskPoints.length; i++) {
//         ctx.lineTo(maskPoints[i].x, maskPoints[i].y);
//       }
//       ctx.closePath();
//       ctx.clip();
//       ctx.drawImage(imageRef.current, 0, 0);
//       ctx.restore();
//     }

//     // Draw the current mask path while drawing
//     if (isDrawing && maskPoints.length > 0) {
//       ctx.beginPath();
//       ctx.strokeStyle = "#00ff00";
//       ctx.lineWidth = 2;
//       ctx.moveTo(maskPoints[0].x, maskPoints[0].y);

//       for (let i = 1; i < maskPoints.length; i++) {
//         ctx.lineTo(maskPoints[i].x, maskPoints[i].y);
//       }

//       if (lastPoint) {
//         ctx.lineTo(lastPoint.x, lastPoint.y);
//       }

//       ctx.stroke();
//     }
//   };

//   useEffect(() => {
//     drawCanvas();
//   }, [
//     text,
//     fontSize,
//     textColor,
//     position,
//     font,
//     maskPoints,
//     lastPoint,
//     showTextBounds,
//   ]);

//   const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     if (isDrawing) {
//       if (drawingMode === "freehand") {
//         setMaskPoints([{ x, y }]);
//       } else {
//         setMaskPoints([...maskPoints, { x, y }]);
//       }
//     } else if (isPointInText(x, y)) {
//       setIsDraggingText(true);
//     }
//   };

//   const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!canvasRef.current) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setLastPoint({ x, y });

//     if (isDraggingText) {
//       setPosition({ x, y: y - fontSize });
//     } else if (isDrawing && drawingMode === "freehand" && e.buttons === 1) {
//       setMaskPoints([...maskPoints, { x, y }]);
//     }
//   };

//   const handleCanvasMouseUp = () => {
//     setIsDraggingText(false);
//   };

//   const handleDrawMask = () => {
//     setIsDrawing(!isDrawing);
//     setMaskPoints([]);
//     setLastPoint(null);
//   };

//   const handleUndoLastPoint = () => {
//     setMaskPoints(maskPoints.slice(0, -1));
//   };

//   const handleExport = () => {
//     if (!canvasRef.current) return;
//     const link = document.createElement("a");
//     link.download = "layered-text-image.png";
//     link.href = canvasRef.current.toDataURL();
//     link.click();
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4">
//       <div className="w-full md:w-3/4">
//         <canvas
//           ref={canvasRef}
//           onMouseDown={handleCanvasMouseDown}
//           onMouseMove={handleCanvasMouseMove}
//           onMouseUp={handleCanvasMouseUp}
//           onMouseLeave={handleCanvasMouseUp}
//           className="border border-gray-200 rounded-lg max-w-full cursor-crosshair"
//           style={{ maxHeight: "80vh" }}
//         />
//         {isDrawing && (
//           <div className="mt-2 p-4 bg-yellow-50 rounded-lg flex items-center gap-2">
//             <AlertCircle className="text-yellow-500" />
//             <p className="text-sm text-yellow-700">
//               {drawingMode === "freehand"
//                 ? "Click and drag to draw around the foreground object"
//                 : "Click to add points around the foreground object"}
//             </p>
//           </div>
//         )}
//       </div>
//       <div className="w-full md:w-1/4 space-y-4">
//         <div>
//           <Label htmlFor="text">Text</Label>
//           <Input
//             id="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>
//         <div>
//           <Label htmlFor="font">Font</Label>
//           <Select value={font} onValueChange={setFont}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select font" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Arial">Arial</SelectItem>
//               <SelectItem value="Times New Roman">Times New Roman</SelectItem>
//               <SelectItem value="Helvetica">Helvetica</SelectItem>
//               <SelectItem value="Georgia">Georgia</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <Label htmlFor="fontSize">Font Size</Label>
//           <Slider
//             id="fontSize"
//             min={20}
//             max={200}
//             step={1}
//             value={[fontSize]}
//             onValueChange={(value) => setFontSize(value[0])}
//           />
//         </div>
//         <div>
//           <Label htmlFor="color">Text Color</Label>
//           <Input
//             id="color"
//             type="color"
//             value={textColor}
//             onChange={(e) => setTextColor(e.target.value)}
//           />
//         </div>
//         <div className="space-y-2">
//           <Button
//             variant="outline"
//             onClick={() => setShowTextBounds(!showTextBounds)}
//             className="w-full"
//           >
//             {showTextBounds ? "Hide" : "Show"} Text Bounds
//           </Button>
//           <Button
//             variant={isDrawing ? "destructive" : "default"}
//             onClick={handleDrawMask}
//             className="w-full"
//           >
//             {isDrawing ? "Finish Mask" : "Draw Mask"}
//           </Button>
//           {isDrawing && (
//             <>
//               <Select
//                 value={drawingMode}
//                 onValueChange={(value: "freehand" | "points") =>
//                   setDrawingMode(value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select drawing mode" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="freehand">Freehand Drawing</SelectItem>
//                   <SelectItem value="points">Point by Point</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button
//                 variant="outline"
//                 onClick={handleUndoLastPoint}
//                 className="w-full"
//               >
//                 Undo Last Point
//               </Button>
//             </>
//           )}
//         </div>
//         <Button onClick={handleExport} className="w-full">
//           Export Image
//         </Button>
//       </div>
//     </div>
//   );
// }

import React from "react";

const Page = () => {
  return <div>page</div>;
};

export default Page;
