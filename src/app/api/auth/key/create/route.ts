import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  return NextResponse.json({ request: data, status: 200 });
}
