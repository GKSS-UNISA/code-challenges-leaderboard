import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check if the request is coming from a user with an API key in the headers
    const session = await auth.api.getSession(request);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // increment user points in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        points: {
          increment: Number.parseInt(process.env.POINTS_INCREMENT!),
        },
      },
    });

    return NextResponse.json(
      { message: "Points incremented successfully" },
      { status: 200 }
    );
  } catch (error) {
    // send error to error tracking service
    console.error("Error getting session:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
