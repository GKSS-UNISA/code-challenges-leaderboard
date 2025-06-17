"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Copy } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

type AccountSettingsProps = {
  existingKeyId: string | null;
  generateNewKeyAction: () => Promise<{
    success: boolean;
    apiKey?: string;
    error?: string;
  }>;
};

export default function ApiKeyManagementCard({
  existingKeyId,
  generateNewKeyAction,
}: AccountSettingsProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [genState, setGenState] = React.useState({
    newApiKey: "",
    isGenerating: false,
    error: "",
  });

  const handleGenerateKey = async () => {
    setGenState({
      ...genState,
      isGenerating: true,
    });

    try {
      const result = await generateNewKeyAction();

      if (result.success && result.apiKey) {
        setGenState({
          ...genState,
          isGenerating: false,
          newApiKey: result.apiKey,
        });
      } else {
        setGenState({
          ...genState,
          isGenerating: false,
          error: result.error || "Failed to generate API key",
        });
      }
    } catch (err) {
      // send to error tracking service
      console.error("Error generating API key:", err);
      setGenState({
        ...genState,
        isGenerating: false,
        error: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const copyToClipboard = async () => {
    if (genState.newApiKey) {
      setIsCopied(false);
      try {
        await navigator.clipboard.writeText(genState.newApiKey);
        setIsCopied(true);
        // Add toast notification here if you have a toast system
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      } finally {
        // Reset copied state after a short delay
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">API Key Management</h2>
      <Separator className="mb-4" />

      {genState.newApiKey ? (
        <div className="mb-4">
          <p className="mb-2">
            <strong>Your New API Key:</strong>
          </p>
          <div className="flex items-center gap-2 p-2 bg-accent rounded">
            <code className="flex-1 break-all text-sm p-2">
              {genState.newApiKey}
            </code>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" onClick={copyToClipboard} size="icon">
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Copy to clipboard</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-sm text-amber-300 mt-2">
            Important: Save this key now. You won&apos;t be able to see it
            again!
          </p>
        </div>
      ) : existingKeyId ? (
        <div className="mb-4">
          <p className="mb-2">
            <strong>API Key:</strong> •••••••••••••••••• (hidden for security)
          </p>
          <p className="text-sm text-muted-foreground">
            You have an active API key. For security reasons, the full key is
            only shown once when created.
          </p>
        </div>
      ) : (
        <p className="mb-2">
          <strong>API Key:</strong> Not generated yet
        </p>
      )}

      <Button
        onClick={handleGenerateKey}
        disabled={genState.isGenerating}
        className="mt-4"
      >
        {genState.isGenerating ? "Generating..." : "Generate Key"}
      </Button>
      {genState.error && (
        <div className="text-destructive text-xs mt-2 mb-4">
          {genState.error}
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-2">
        Warning: Creating a new API key will invalidate any existing keys.
      </p>
    </>
  );
}
