import { type NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { nanoid } from "nanoid";
import { generateClientId } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const data = evt.data;
    const { id } = data;
    if (!id) {
      return NextResponse.json(
        { error: "Missing clerkUserId in webhook data" },
        { status: 400 },
      );
    }

    const newClientId = nanoid(21);
    generateClientId(id, newClientId);

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    // TODO: Send exception to Sentry
    console.error("Error in webhook handler:", error);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 },
    );
  }
}
