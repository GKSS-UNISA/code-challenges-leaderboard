import React from "react";
import Hero from "@/components/sections/Hero";
import Dashboard from "@/components/sections/Dashboard";

export default function Index() {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <Hero />;
}
