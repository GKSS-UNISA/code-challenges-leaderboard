import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const clerkUserId = req.headers.get("x-clerk-user-id");
  if (!clerkUserId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const item = await prisma.clientID.findUnique({
      where: {
        clerkUserId,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Client ID not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ clientId: item.value }, { status: 200 });
  } catch (error) {
    // send exception to Sentry
    console.error("Error fetching client ID:", error);
    return NextResponse.json(
      { error: "Error fetching client ID" },
      { status: 500 },
    );
  }
}
