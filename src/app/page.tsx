import Hero from "@/components/sections/hero";
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

export default async function Index() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tableHeaders = ["ID", "Name", "Email", "Points"];

  const tableData = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      points: 125,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      points: 347,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "mchen@example.com",
      points: 290,
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      points: 188,
    },
    {
      id: "5",
      name: "James Rodriguez",
      email: "jrodriguez@example.com",
      points: 423,
    },
    {
      id: "6",
      name: "Olivia Taylor",
      email: "otaylor@example.com",
      points: 156,
    },
    {
      id: "7",
      name: "Robert Kim",
      email: "rkim@example.com",
      points: 275,
    },
    {
      id: "8",
      name: "Emily Davis",
      email: "e.davis@example.com",
      points: 310,
    },
    {
      id: "9",
      name: "Daniel Martinez",
      email: "dmartinez@example.com",
      points: 201,
    },
    {
      id: "10",
      name: "Sophia Ahmed",
      email: "sahmed@example.com",
      points: 355,
    },
    {
      id: "11",
      name: "William Brown",
      email: "wbrown@example.com",
      points: 178,
    },
    {
      id: "12",
      name: "Ava Garcia",
      email: "agarcia@example.com",
      points: 267,
    },
    {
      id: "13",
      name: "Ethan Patel",
      email: "epatel@example.com",
      points: 389,
    },
    {
      id: "14",
      name: "Isabella Wong",
      email: "iwong@example.com",
      points: 233,
    },
    {
      id: "15",
      name: "Alexander Thompson",
      email: "athompson@example.com",
      points: 298,
    },
    {
      id: "16",
      name: "Mia Nguyen",
      email: "mnguyen@example.com",
      points: 312,
    },
    {
      id: "17",
      name: "Benjamin Lee",
      email: "blee@example.com",
      points: 245,
    },
    {
      id: "18",
      name: "Charlotte Robinson",
      email: "crobinson@example.com",
      points: 176,
    },
    {
      id: "19",
      name: "Jacob Singh",
      email: "jsingh@example.com",
      points: 401,
    },
    {
      id: "20",
      name: "Amelia Clark",
      email: "aclark@example.com",
      points: 287,
    },
  ];

  if (!session) {
    return <Hero className="h-[calc(100vh-120px)]" />;
  }

  return (
    <Section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card className="col-span-1 sm:col-span-2 md:col-span-1">
        <CardContent>
          <h1 className="text-lg font-bold mb-2">
            Hey there, {session.user.name}!
          </h1>
          <Separator className="mb-2" />
          <p className="text-muted-foreground">{session.user.email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Your Rank</h2>
          <Separator className="mb-2" />
          <p className="text-2xl font-bold">5th</p>
          <p className="text-muted-foreground mt-1">
            You&apos;re in the top 5% of participants!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Your Points</h2>
          <Separator className="mb-2" />
          <p className="text-2xl font-bold">1500</p>
          <p className="text-muted-foreground mt-1">Keep up the great work!</p>
        </CardContent>
      </Card>

      <div className="col-span-full">
        <Table className="w-full">
          <TableCaption className="w-full text-center">
            List of all participants and their points
          </TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, i) => (
                <TableHead key={i} className="w-[100px]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}
