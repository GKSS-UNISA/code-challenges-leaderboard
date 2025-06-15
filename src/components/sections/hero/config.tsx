import { ReactNode } from "react";
import type { ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[];
  className?: string;
}

const config: HeroProps = {
  title: "Code Challenges Leaderboard Platform",
  description:
    "See your progress, compare with peer, and improve your coding skills with our platform. Join the community of developers and start coding today!",
  badge: (
    <Badge variant="secondary" className="animate-appear">
      <span className="text-muted-foreground">Upskill your coding skills</span>
      <Link href="/docs" className="flex items-center gap-1">
        Get started
        <ArrowRightIcon className="size-3" />
      </Link>
    </Badge>
  ),
  buttons: [
    {
      href: "/docs",
      text: "Get Started",
      variant: "default",
    },
    {
      href: "https://github.com/GKSS-UNISA/code-challenges-leaderboard/",
      text: "Github",
      variant: "glow",
      icon: <GitHubLogoIcon className="mr-2 size-4" />,
    },
  ],
};

export default config;
