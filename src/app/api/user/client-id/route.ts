import { NextResponse, type NextRequest } from "next/server";
import { getClientId } from "@/lib/db";

export async function GET(req: NextRequest) {
  const data = await req.json();
  if (!data || !data.clerkUserId) {
    return NextResponse.json(
      { error: "clerkUserId is required" },
      { status: 400 },
    );
  }

  const clientId = await getClientId(data.clerkUserId);
  // @ts-ignore: TODO: come back to fix this
  if (!clientId) {
    return NextResponse.json({ error: "Client ID not found" }, { status: 404 });
  }

  return NextResponse.json({ data: clientId });
}
