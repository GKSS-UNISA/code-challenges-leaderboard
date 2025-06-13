import { z } from "zod/v4";

export const ClientIDSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  clerkUserId: z.string(),
  value: z.string().optional(),
});

export const ScoreSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  clientId: z.string(),
  value: z.number().int(),
});

export const CreateClientIDSchema = z.object({
  clerkUserId: z.string(),
  value: z.string().nullable().optional(),
});

export const CreateScoreSchema = z.object({
  clientId: z.string(),
  value: z.number().int(),
});
