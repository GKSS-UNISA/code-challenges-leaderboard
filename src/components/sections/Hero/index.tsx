import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 w-full">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Code Challenges Leaderboard
        </h1>
        <p className="text-xl mb-8">
          Improve your coding skills by completing challenges and competing with
          others. Track your progress and climb the leaderboard!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-semibold" asChild>
            <Link href={"/register"}>Sign In</Link>
          </Button>
          <Button size="lg" variant="outline" className="font-semibold" asChild>
            <Link href={"https://github.com/GKSS-UNISA/code-challenges/"}>
              Browse Challenges
            </Link>
          </Button>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-8">
          <div className="p-6 bg-primary shadow-sm rounded-lg">
            <h3 className="text-lg font-extrabold text-foreground">Practice</h3>
            <p className="mt-2 text-muted-foreground">
              Solve coding challenges at your own pace with increasing
              difficulty.
            </p>
          </div>
          <div className="p-6 bg-muted shadow-sm rounded-lg">
            <h3 className="text-lg text-foreground font-extrabold">Track</h3>
            <p className="mt-2 text-secondary-foreground">
              Monitor your progress and see how you rank against other coders.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
