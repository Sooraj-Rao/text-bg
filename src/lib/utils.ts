import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomLoadingMessage(): string {
  const messages = [
    "Removing background magic...",
    "Preparing your canvas...",
    "Sharpening our digital scissors...",
    "Brewing some pixel perfection...",
    "Warming up our image processors...",
    "Calibrating color balance...",
    "Polishing pixels to perfection...",
    "Untangling complex algorithms...",
    "Adjusting the virtual lighting...",
    "Summoning the image editing spirits...",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
