import { ReactNode } from "react";
import Logo from "../logos/gkss-unisa-logo";

interface NavbarLink {
  text: string;
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
    { text: "Docs", href: "/docs" },
    {
      text: "Issues",
      href: "https://github.com/GKSS-UNISA/code-challenges/issues",
    },
  ],
};

export default config;
