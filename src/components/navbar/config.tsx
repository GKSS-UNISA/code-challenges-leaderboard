import { ReactNode } from "react";
import Logo from "../logos/gkss-unisa-logo";
import type { MenuItem, NavigationProps } from "../ui/navigation";

interface NavbarLink extends MenuItem {
  href: string;
}

interface ConfigProps extends NavigationProps {
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
    { title: "Docs", href: "/docs", isLink: true },
    {
      title: "Issues",
      href: "https://github.com/GKSS-UNISA/code-challenges/issues",
      isLink: true,
    },
  ],
  protectedMenuItems: [{ title: "Profile", href: "/profile", isLink: true }],
};

export default config;
