import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { createAuthClient } from "better-auth/react";
import { apiKey } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  advanced: {
    cookies: {
      session_token: {
        name: "gkss_cck.session_token",
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    apiKey({
      apiKeyHeaders: process.env.API_KEY_HEADER_NAME,
      rateLimit: { maxRequests: 120 },
    }),
  ],
});

export const authClient = createAuthClient({});
