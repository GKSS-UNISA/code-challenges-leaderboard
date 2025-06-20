import { ReactNode } from "react";
import Logo from "../logos/gkss-unisa-logo";
import type { MenuItem } from "../ui/navigation";

interface NavbarLink extends MenuItem {
  href: string;
}

interface ConfigProps {
  logo?: ReactNode;
  name: string;
  homeUrl: string;
  mobileLinks: NavbarLink[];
  className?: string;
}

const config: ConfigProps = {
  logo: <Logo />,
  name: "Code Challenges",
  homeUrl: "/",
  mobileLinks: [
    { title: "Docs", href: "/docs", isLink: true, needsAuth: false },
    {
      title: "Issues",
      href: "https://github.com/GKSS-UNISA/code-challenges/issues",
      isLink: true,
      needsAuth: false,
    },
  ],
};

export default config;
