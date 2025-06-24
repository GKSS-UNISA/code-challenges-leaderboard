import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/ui/section";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export default async function Index() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tableHeaders = ["Name", "Points"];
  const records = await prisma.user.findMany();
  const users = records.sort((a, b) => b.points - a.points);

  function getUserRank(userId: string) {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return "User not found";
    }

    const position = userIndex + 1;
    switch (String(position)) {
      case "1":
        return "🥇 1st Place";
      case "2":
        return "🥈 2nd Place";
      case "3":
        return "🥉 3rd Place";
      default:
        return `${position}th Place`;
    }
  }

  function getUserPoints(userId: string) {
    const user = users.find((user) => user.id === userId);
    return user ? user.points : 0;
  }

  return (
    <Section
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      data-testid="dashboard"
    >
      <Card
        className="col-span-1 sm:col-span-2 md:col-span-1"
        data-testid="user-card"
      >
        <CardContent>
          <h1 className="text-lg font-bold mb-2">
            Hey there, {session?.user.name}!
          </h1>
          <Separator className="mb-2" />
          <p className="text-muted-foreground">{session?.user.email}</p>
        </CardContent>
      </Card>

      <Card data-testid="rank-card">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Your Rank</h2>
          <Separator className="mb-2" />
          <p className="text-2xl font-bold">
            {getUserRank(session?.user.id || "0")}
          </p>
          <p className="text-muted-foreground mt-1">
            You&apos;re in the top 5% of participants!
          </p>
        </CardContent>
      </Card>

      <Card data-testid="points-card">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Your Points</h2>
          <Separator className="mb-2" />
          <p className="text-2xl font-bold">
            {getUserPoints(session?.user.id || "0")}
          </p>
          <p className="text-muted-foreground mt-1">Keep up the great work!</p>
        </CardContent>
      </Card>

      <div className="col-span-full" data-testid="participants-table-section">
        <Table className="w-full" data-testid="participants-table">
          <TableCaption
            className="w-full text-center"
            data-testid="table-caption"
          >
            List of all participants and their points
          </TableCaption>
          <TableHeader data-test_id="table-header">
            <TableRow>
              {tableHeaders.map((header, i) => (
                <TableHead
                  key={i}
                  className="w-[100px] font-bold text-lg"
                  data-testid={`table-header-cell}`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody data-testid="table-body">
            {users.map((user) => (
              <TableRow key={user.id} data-testid={`table-row-data-row`}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}
