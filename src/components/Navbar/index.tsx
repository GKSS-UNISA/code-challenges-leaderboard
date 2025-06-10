"use client";

import { Menu } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import Navigation from "@/components/ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import config from "./config";
import { title } from "process";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const { homeUrl, logo, mobileLinks, actions } = config;

  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <Link
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              <Image
                width={40}
                height={40}
                src={config.logo.img.src}
                alt={config.logo.img.alt}
                className="rounded-full"
              />
            </Link>

            {showNavigation &&
              (customNavigation || (
                <Navigation
                  logoHref="/"
                  menuItems={[
                    ...mobileLinks.map((link, i) => ({
                      title: link.title,
                      href: link.href,
                      isLink: true,
                    })),
                  ]}
                />
              ))}
          </NavbarLeft>

          <NavbarRight>
            {actions.map((action, index) =>
              action.isButton ? (
                <Button key={index} asChild>
                  <Link href={action.href}>{action.title}</Link>
                </Button>
              ) : (
                <Link
                  key={index}
                  href={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.title}
                </Link>
              ),
            )}

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
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{logo.name}</span>
                  </Link>

                  {mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
