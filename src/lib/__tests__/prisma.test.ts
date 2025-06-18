import { test, expect } from "vitest";
import prisma from "../prisma";

test("prisma client is defined", () => {
  expect(prisma).toBeDefined();
});
