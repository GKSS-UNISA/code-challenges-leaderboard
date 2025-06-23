"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../ui/navbar";
import Navigation from "../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import config from "./config";
import ButtonBox from "../button-box";
import useAuth from "@/hooks/useAuth";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  showNavigation?: boolean;
  customNavigation?: React.ReactNode;
  className?: string;
}

export default function Navbar({
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const session = authClient.useSession();
  const { isAuthenticated } = useAuth(session?.data?.session);
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/home");
        },
      },
    });
  }

  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <Link
              href={config.homeUrl}
              className="flex items-center gap-2 text-lg sm:text-xl font-bold"
            >
              {config.logo}
              <span className="hidden sm:block">{config.name}</span>
            </Link>
            {showNavigation &&
              (customNavigation || (
                <Navigation
                  menuItems={config.mobileLinks}
                  protectedMenuItems={
                    isAuthenticated ? config.protectedMenuItems : undefined
                  }
                />
              ))}
          </NavbarLeft>
          <NavbarRight>
            <ButtonBox />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mb-4">
                  <Link
                    href={config.homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{config.name}</span>
                  </Link>
                  {isAuthenticated &&
                    config.protectedMenuItems?.map((link, index) => (
                      <Link
                        key={`${link?.href}-${index}`}
                        href={link.href || "#"}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    ))}
                  {config.mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                )}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 w-full">
                    <Button asChild variant="ghost">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
