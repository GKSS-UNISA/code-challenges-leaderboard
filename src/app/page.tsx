"use client";

import React from "react";
import Hero from "@/components/sections/hero";
import Dashboard from "@/components/sections/dashboard";
import isAuthenticated from "./auth-context";

export default function Index() {
  // TODO(SECURITY): Fix logic to check if the user is signed in
  const isSignedIn = typeof window !== "undefined" ? isAuthenticated() : false;

  if (isSignedIn) {
    return <Dashboard />;
  }

  return <Hero />;
}
