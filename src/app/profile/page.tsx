import ApiKeyManagementCard from "@/components/api-key-management-card";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Implement a proper unauthorized page
  if (!session) {
    return (
      <Section className="w-full h-[calc(100vh-120px)] flex items-center justify-center">
        <Card>
          <CardContent>
            <h1 className="text-4xl font-bold mb-6">Profile</h1>
            <p className="text-red-500">
              You are not authorized to view this page.
            </p>
          </CardContent>
        </Card>
      </Section>
    );
  }

  const { user } = session;
  let apiKeyId: string | null = null;

  try {
    const apiKeys = await auth.api.listApiKeys({
      headers: await headers(),
    });

    // Find the enabled API key for the user
    if (apiKeys && apiKeys.length > 0) {
      const activeKey = apiKeys.find(
        (key) => key.userId === user.id && key.enabled
      );

      if (activeKey) {
        apiKeyId = activeKey.id;
      }
    }
  } catch (error) {
    // send to error tracking service
    console.error(error);
  }

  async function generateNewKeyAction(): Promise<{
    success: boolean;
    apiKey?: string;
    error?: string;
  }> {
    "use server";

    try {
      const res = await auth.api.createApiKey({
        body: {
          userId: user.id,
          prefix: process.env.API_KEY_PREFIX || "api_key",
        },
      });

      if (!res)
        return {
          success: false,
          error: "Couldn't generate API Key. Please try again.",
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

  return (
    <Section className="grid grid-cols-1 gap-6">
      <h1 className="text-4xl font-bold">My Profile</h1>
      <Separator />
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">User Information</h2>
          <Separator className="mb-4" />
          <p className="mb-2">
            <strong>Name:</strong> {user.name || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Date Joined:</strong> {user.createdAt.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <ApiKeyManagementCard
            existingKeyId={apiKeyId}
            generateNewKeyAction={generateNewKeyAction}
          />
        </CardContent>
      </Card>
    </Section>
  );
}
