import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { createAuthClient } from "better-auth/react";
import { apiKey } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME;
if (!API_KEY_HEADER_NAME) {
  throw new Error("API_KEY_HEADER_NAME environment variable is not set");
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    apiKey({
      apiKeyHeaders: API_KEY_HEADER_NAME,
      rateLimit: { maxRequests: 120 },
    }),
  ],
});

export const authClient = createAuthClient({});
