"use client";

import { useClerk } from "@clerk/nextjs";

export default function isAuthenticated() {
  const { isSignedIn } = useClerk();
  return isSignedIn;
}
