import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { clerkUserId } = await req.json();

  if (!clerkUserId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const newClientId = nanoid(21);

    await prisma.clientID.update({
      where: { clerkUserId },
      data: { value: newClientId },
    });

    revalidatePath("/profile");

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    // send exception to Sentry
    console.error("Error generating client ID:", error);
    return NextResponse.json(
      { error: "Error generating client ID" },
      { status: 500 },
    );
  }
}
