"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="text-xl font-bold">
        Text Behind Image
      </Link>
      <div></div>
    </nav>
  );
}
