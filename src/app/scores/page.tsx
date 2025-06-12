import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Participants() {
  // Replace with actual data fetching logic for scores and scores
  const scores = [
    { username: "CodeNinja42", score: 90 },
    { username: "ByteMaster", score: 100 },
    { username: "GitWizard", score: 80 },
    { username: "DevDragon", score: 30 },
    { username: "HackHero", score: 8320 },
    { username: "PixelPioneer", score: 3 },
    { username: "BugBuster", score: 453 },
    { username: "SyntaxSorcerer", score: 854 },
    { username: "QueueQueen", score: 2 },
    { username: "ForkPhantom", score: 80 },
    { username: "CommitCrusader", score: 375 },
    { username: "AlgoAce", score: 272227 },
    { username: "PullRequestPro", score: 80 },
    { username: "BranchBaron", score: 940 },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  return (
    <main className="flex flex-col items-start justify-start min-h-[calc(100vh-64px)] p-6 w-full">
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
              {scores.map((score) => (
                <TableRow key={score.username}>
                  <TableCell className="font-bold">{score.username}</TableCell>
                  <TableCell>{score.score}</TableCell>
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
