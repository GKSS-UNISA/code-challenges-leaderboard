import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );

    const { user } = session;
    const { key } = await auth.api.createApiKey({
      body: {
        userId: user.id,
        prefix: process.env.API_KEY_PREFIX || "api_key",
      },
    });

    return NextResponse.json({ apiKey: key }, { status: 201 });
  } catch (e: any) {
    // send to error trackig service
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
