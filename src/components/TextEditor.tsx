import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TextStyle {
  fontSize: number;
  color: string;
  opacity: number;
  x: number;
  y: number;
}

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  textStyle: TextStyle;
  setTextStyle: (style: TextStyle) => void;
}

export default function TextEditor({
  text,
  setText,
  textStyle,
  setTextStyle,
}: TextEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here"
        />
      </div>
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <Slider
          id="fontSize"
          min={12}
          max={72}
          step={1}
          value={[textStyle.fontSize]}
          onValueChange={(value) =>
            setTextStyle({ ...textStyle, fontSize: value[0] })
          }
        />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={textStyle.color}
          onChange={(e) =>
            setTextStyle({ ...textStyle, color: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="opacity">Opacity</Label>
        <Slider
          id="opacity"
          min={0}
          max={1}
          step={0.1}
          value={[textStyle.opacity]}
          onValueChange={(value) =>
            setTextStyle({ ...textStyle, opacity: value[0] })
          }
        />
      </div>
    </div>
  );
}
