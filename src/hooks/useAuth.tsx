"use client";

import * as React from "react";
import type { Session } from "better-auth";

export default function useAuth(session?: Session) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  return { isAuthenticated };
}
