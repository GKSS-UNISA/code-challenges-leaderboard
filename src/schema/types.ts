import { ClientIDSchema, ScoreSchema } from ".";
import { z } from "zod/v4";

export type ClientID = z.infer<typeof ClientIDSchema>;
export type Score = z.infer<typeof ScoreSchema>;
