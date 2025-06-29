import ApiKeyManagementCard from "@/components/api-key-management-card";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { generateNewKeyAction } from "./actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Middleware ensures a session exists
  if (!session) return;

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

  async function handleGenerateNewKey() {
    "use server";

    return generateNewKeyAction(user);
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
            generateNewKeyAction={handleGenerateNewKey}
          />
        </CardContent>
      </Card>
    </Section>
  );
}
