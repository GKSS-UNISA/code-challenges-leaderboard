import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// TODO: Fix this implementation to return the client ID for the user
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-clerk-user-id");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const clientId = prisma.clientID.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return NextResponse.json({ clientId }, { status: 200 });
}
