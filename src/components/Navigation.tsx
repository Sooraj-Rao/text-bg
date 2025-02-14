"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="text-xl font-bold">
        Text Behind Image
      </Link>
      <div>
        {session ? (
          <>
            <span className="mr-4">Signed in as {session.user?.email}</span>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </nav>
  );
}
