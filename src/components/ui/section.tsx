import * as React from "react";
import { cn } from "@/lib/utils";

export default function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn("bg-background text-foreground px-4 py-12 ", className)}
      {...props}
    />
  );
}
