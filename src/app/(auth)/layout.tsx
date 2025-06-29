import Section from "@/components/ui/section";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Section className="h-[calc(100vh-120px)] flex flex-col items-center justify-center max-w-7xl mx-auto">
      {children}
    </Section>
  );
}
