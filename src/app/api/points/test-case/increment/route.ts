import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        points: {
          increment: Number.parseInt(process.env.POINTS_INCREMENT!),
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        points: true,
      },
    });

    const safeUser = {
      email: user?.email,
      points: String(user?.points),
    };

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    // send to error tracking service
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
