"use client";

import * as React from "react";
import { authClient } from "@/lib/auth";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function ButtonBox() {
  const [isHome, setIsHome] = React.useState(false);

  const { data: session } = authClient.useSession();

  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (pathname === "/home") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [pathname]);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/home");
        },
      },
    });
  }

  return (
    <>
      {!session && (
        <>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/register">Get Started</Link>
          </Button>
        </>
      )}

      {session && (
        <>
          {isHome ? (
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                variant="destructive"
                className="hidden sm:inline-flex"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/home">Go to Home</Link>
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
