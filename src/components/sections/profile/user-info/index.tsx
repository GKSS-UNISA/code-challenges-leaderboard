"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function UserInfo() {
  const { user } = useClerk();

  const [clientId, setClientId] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchClientId() {
      const clerkUserId = user?.id;
      if (!clerkUserId) return;

      const res = await fetch("/api/user/client-id", {
        method: "GET",
        headers: {
          "x-clerk-user-id": clerkUserId,
        },
      });

      if (!res.ok) {
        // send exception to Sentry
        console.error("Failed to fetch client ID");
        return;
      }

      const { clientId } = await res.json();
      setClientId(clientId);
    }

    fetchClientId();
  }, [user?.id]);

  return (
    <div className="w-full flex flex-col items-start justify-start gap-6">
      <div className="w-full bg-card text-card-foreground p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold text-2xl mb-2">Name</h1>
        <span className="text-lg">
          {user?.firstName} {user?.lastName}
        </span>
      </div>

      <div className="w-full bg-card text-card-foreground p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold text-2xl mb-2 rounded-md">GitHub Username</h1>
        <span>{user?.username}</span>
      </div>

      <div className="w-full bg-card text-card-foreground p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold text-2xl mb-2 rounded-md">Points Earned</h1>
        <span>{/* Total points earned by the current user */}</span>
      </div>

      <div className="w-full bg-accent text-card-foreground p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-bold text-2xl mb-2 rounded-md">Your Client ID</h1>
        <div className="flex items-center gap-2">
          <span className="bg-popover py-2 px-4 rounded-full text-popover-foreground">
            {clientId || "No Client ID generated yet"}
          </span>

          {/* Implement client ID generation logic for this button */}
          <Button variant="secondary">
            {clientId ? "Regenerate" : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
