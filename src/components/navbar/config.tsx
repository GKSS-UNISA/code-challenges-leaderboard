import { ReactNode } from "react";
import { ButtonProps } from "../ui/button";
import Logo from "../logos/gkss-unisa-logo";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface ConfigProps {
  logo?: ReactNode;
  name: string;
  homeUrl: string;
  mobileLinks: NavbarLink[];
  actions: NavbarActionProps[];
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
  actions: [
    {
      text: "Sign in",
      href: "/login",
      isButton: false,
    },
    {
      text: "Sign Up",
      href: "/register",
      isButton: true,
      variant: "default",
    },
  ],
};

export default config;
