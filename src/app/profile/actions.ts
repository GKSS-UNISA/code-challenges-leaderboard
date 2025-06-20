import { auth } from "@/lib/auth";
import type { User } from "better-auth";

export async function generateNewKeyAction(user: User): Promise<{
  success: boolean;
  apiKey?: string;
  error?: string;
}> {
  try {
    const res = await auth.api.createApiKey({
      body: {
        userId: user.id,
      },
    });

    if (!res)
      return {
        success: false,
        error: "An API Key was not generated. Please try again.",
      };

    return {
      success: true,
      apiKey: res.key,
    };
  } catch (error) {
    // send to error tracking service
    console.error("Error generating API key:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
