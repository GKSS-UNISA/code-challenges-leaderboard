import React from "react";
import Hero from "@/components/sections/hero";
import Dashboard from "@/components/sections/dashboard";

export default function Index() {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <Hero />;
}
