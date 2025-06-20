import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import config from "@/components/sections/hero/config";
import Link from "next/link";

export default function Hero() {
  return (
    <Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0 h-[calc(100vh-120px)] flex flex-col items-center justify-center max-w-7xl mx-auto">
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          {config.badge !== false && config.badge}
          <h1 className="from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-wide md:text-8xl">
            {config.title}
          </h1>
          <p className="text-md text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance delay-100 sm:text-xl">
            {config.description}
          </p>
          {config.buttons && config.buttons.length > 0 && (
            <div className="relative z-10 flex justify-center gap-4 delay-300">
              {config.buttons.map((button, index) => (
                <Button key={index} variant={button.variant} size="lg" asChild>
                  <Link href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
