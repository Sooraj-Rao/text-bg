import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Copy,
  Trash2,
  Type,
  Palette,
  Move,
  RotateCw,
  ArrowLeftRight,
  ArrowUpDown,
  Text,
  Bold,
  Droplet,
} from "lucide-react";
import type { TextSet } from "@/types/editor";

interface TextCustomizerProps {
  textSet: TextSet;
  handleAttributeChange: (
    id: number,
    attribute: string,
    value: string | number
  ) => void;
  removeTextSet: (id: number) => void;
  duplicateTextSet: (textSet: TextSet) => void;
}

const ICONS: Record<string, JSX.Element> = {
  left: <Move className="h-4 w-4 text-gray-400 mr-2" />,
  top: <Move className="h-4 w-4 text-gray-400 mr-2" />,
  fontSize: <Text className="h-4 w-4 text-gray-400 mr-2" />,
  bold: <Bold className="h-4 w-4 text-gray-400 mr-2" />,
  opacity: <Droplet className="h-4 w-4 text-gray-400 mr-2" />,
  rotation: <RotateCw className="h-4 w-4 text-gray-400 mr-2" />,
  tiltX: <ArrowLeftRight className="h-4 w-4 text-gray-400 mr-2" />,
  tiltY: <ArrowUpDown className="h-4 w-4 text-gray-400 mr-2" />,
};

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  textSet,
  handleAttributeChange,
  removeTextSet,
  duplicateTextSet,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm"
    >
      <AccordionItem value={`item-${textSet.id}`}>
        <AccordionTrigger className="px-4 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-xl">
          {textSet.text}
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-5 bg-white dark:bg-gray-900 rounded-b-xl">
          {/* Text Input */}
          <div>
            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Text
            </Label>
            <div className="flex items-center mt-1">
              <Type className="h-4 w-4 text-gray-400 mr-2" />
              <Input
                value={textSet.text}
                onChange={(e) =>
                  handleAttributeChange(textSet.id, "text", e.target.value)
                }
                className="flex-grow"
              />
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Font
            </Label>
            <select
              value={textSet.fontFamily}
              onChange={(e) =>
                handleAttributeChange(textSet.id, "fontFamily", e.target.value)
              }
              className="w-full mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          {/* Color Picker */}
          <div>
            <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Color
            </Label>
            <div className="flex items-center mt-1">
              <Palette className="h-4 w-4 text-gray-400 mr-2" />
              <Input
                type="color"
                value={textSet.color}
                onChange={(e) =>
                  handleAttributeChange(textSet.id, "color", e.target.value)
                }
                className="w-full h-8 p-1 rounded-md"
              />
            </div>
          </div>

          {[
            "left",
            "top",
            "fontSize",
            "bold",
            "opacity",
            "rotation",
            "tiltX",
            "tiltY",
          ].map((attr) => (
            <div key={attr} className=" ">
              <div className="flex items-center capitalize">
                {ICONS[attr]}
                <Label className="text-xs font-medium text-gray-500 dark:text-gray-400 flex-grow">
                  {attr.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {textSet[attr]}
              </div>
              <Slider
                min={
                  attr === "bold"
                    ? 100
                    : attr === "opacity"
                    ? 0
                    : attr === "fontSize"
                    ? 0
                    : -180
                }
                max={attr === "bold" ? 900 : attr === "opacity" ? 1 : 180}
                step={attr === "bold" ? 100 : attr === "opacity" ? 0.1 : 1}
                value={[textSet[attr]]}
                onValueChange={(value) =>
                  handleAttributeChange(textSet.id, attr, value[0])
                }
                className="mt-2"
              />
            </div>
          ))}

          {/* Actions */}
          <div className="flex space-x-2 mt-4">
            <Button
              onClick={() => duplicateTextSet(textSet)}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Copy className="mr-2 h-4 w-4" /> Duplicate
            </Button>
            <Button
              onClick={() => removeTextSet(textSet.id)}
              size="sm"
              variant="destructive"
              className="flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TextCustomizer;
