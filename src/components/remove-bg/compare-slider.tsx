import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Move } from "lucide-react";

export function CompareSlider({
  original,
  result,
  value,
  onChange,
}: {
  original: string;
  result: string;
  value: number;
  onChange: (value: number[]) => void;
}) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Image
          src={original || "/placeholder.svg"}
          alt="Original"
          fill
          className="object-contain"
        />
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={result || "/placeholder.svg"}
          alt="Result"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-0.5 h-full bg-white relative"
          style={{ left: `${value}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Move className="text-purple-600" size={20} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Slider
          value={[value]}
          onValueChange={onChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}
