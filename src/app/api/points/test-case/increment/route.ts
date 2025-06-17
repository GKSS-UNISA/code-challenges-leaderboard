import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const POINTS_INCREMENT = 10;
if (!POINTS_INCREMENT)
  throw new Error("POINTS_INCREMENT environment variable is not set");

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    NextResponse.json({ user: session.user }, { status: 200 });
  } catch (error) {
    // send to error tracking service
    console.error("POST /api/points/test-case/increment:", error);
  }
}
