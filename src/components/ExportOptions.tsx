import { Button } from "@/components/ui/button";

export default function ExportOptions() {
  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting...");
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing...");
  };

  return (
    <div className="mt-4 space-x-2">
      <Button onClick={handleExport}>Export</Button>
      <Button onClick={handleShare}>Share</Button>
    </div>
  );
}
