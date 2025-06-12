"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function UserInfo() {
  const { user } = useUser();

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
        <div>
          <span className="bg-popover text-popover-foreground">
            {/* user's client id */}
          </span>

          {/* Implement client ID generation logic for this button */}
          <Button variant="secondary">Generate</Button>
        </div>
      </div>
    </div>
  );
}
