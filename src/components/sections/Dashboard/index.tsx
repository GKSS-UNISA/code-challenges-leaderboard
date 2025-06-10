import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

export default function Dashboard() {
  // Replace with actual user data fetching logic
  const user = {
    username: "github_username",
  };

  // Replace with actual data fetching logic for participants and scores
  const participants = [
    { username: "user2", score: 90 },
    { username: "user1", score: 100 },
    { username: "user3", score: 80 },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  return (
    <main className="flex flex-col items-start justify-start min-h-[calc(100vh-64px)] p-6 w-full">
      <div className="w-full max-w-3xl mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome back, <br />{" "}
          <span className="text-xl font-medium">{user.username}</span>
        </h1>
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Username</TableHead>
              <TableHead className="font-bold">Score</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <>
              {participants.map((participant) => (
                <TableRow key={participant.username}>
                  <TableCell className="font-bold">
                    {participant.username}
                  </TableCell>
                  <TableCell>{participant.score}</TableCell>
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
