"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function UserInfo() {
  const { user } = useClerk();

  // TODO: Implement cleaner way to handle client ID & loading state
  const [clientId, setClientId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchClientId() {
      setIsLoading(true);

      const clerkUserId = user?.id;
      if (!clerkUserId) {
        console.error("No Clerk user ID found");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/user/client-id", {
        method: "GET",
        headers: {
          "x-clerk-user-id": clerkUserId,
        },
      });

      if (!res.ok) {
        // send exception to Sentry
        console.error("Failed to fetch client ID");
        setIsLoading(false);
        return;
      }

      const { clientId } = await res.json();
      setClientId(clientId);
      setIsLoading(false);
    }

    fetchClientId();
  }, [clientId, user?.id]);

  // TODO: Implement logic to automatically reload page when client ID is generated
  async function handleGenerateClientId() {
    const clerkUserId = user?.id;
    if (!clerkUserId) return;

    const res = await fetch("/api/user/client-id/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerkUserId }),
    });

    if (!res.ok) {
      // send exception to Sentry
      console.error("Failed to generate client ID");
      return;
    }

    const { clientId } = await res.json();
    setClientId(clientId);
  }

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

          <Button
            variant="secondary"
            onClick={() => handleGenerateClientId()}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : clientId ? "Regenerate" : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
