import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to Text Behind Image
        </h1>
        <p className="text-xl mb-8">
          Create stunning designs by overlaying text on images
        </p>
        <Button asChild>
          <Link href="/editor">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
